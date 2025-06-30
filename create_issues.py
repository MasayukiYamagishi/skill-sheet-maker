import os
import json
import logging
import re
from textwrap import dedent
from openai import OpenAI
from github import Github

# ログ出力の設定（INFOレベル以上を標準出力に出力）
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def generate_issue_content(task):
    # プロンプト作成（余計なインデントを削除するため dedent を使用）
    prompt = dedent(f"""\ 
        以下のタスクについて、GitHub issueのタイトルと本文を生成してください:

        {task}

        タイトルは「Task:」で始まり、簡潔な要約を続けてください。
        本文には、背景、目的、実装計画のセクションを含めてください。
        以下の形式でJSONを出力してください:
        {{"title": "生成されたタイトル", "body": "生成された本文"}}
    """)
    logging.info("プロンプトを生成しました。タスク: %s", task)
    logging.debug("生成するプロンプト: %s", prompt)
    
    # OpenAI API クライアントの初期化
    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
    )
    
    try:
        response = client.responses.create(
            model="gpt-4o",  # ※ 必要に応じて正しいモデル名に修正してください
            instructions="あなたはGitHub issueを生成するための有能なアシスタントです。",
            input=prompt
        )
    except Exception as e:
        logging.error("OpenAI API 呼び出し中にエラーが発生しました。タスク: %s", task)
        logging.exception(e)
        raise e

    # レスポンスの生テキストを取得
    content = response.output_text
    logging.debug("OpenAI API 生レスポンス（加工前）: %s", content)
    
    # --- 修正部分: コードブロックを示す ``` などを除去する ---
    # 例：テキストの先頭と末尾に ``` があれば削除し、'json'タグも消す
    content = re.sub(r'^```(?:json)?\n?', '', content, flags=re.IGNORECASE)
    content = re.sub(r'\n?```$', '', content)
    content = content.strip()
    logging.debug("クリーンアップ後のOpenAI API レスポンス: %s", content)
    # ------------------------------------------------------
    
    logging.info("OpenAI API 生成結果を受信しました。")
    
    try:
        result = json.loads(content)
    except json.JSONDecodeError as e:
        logging.error("JSONのデコードに失敗しました。タスク: %s", task)
        logging.error("APIのレスポンス: %s", content)
        raise e

    title = result.get("title")
    body = result.get("body")
    if title is None or body is None:
        logging.warning("生成されたタイトルまたは本文が None です。結果: %s", result)
    return title, body

def create_issue(title, body, repo):
    try:
        issue = repo.create_issue(title=title, body=body)
        logging.info("Issue 作成成功: %s", issue.html_url)
    except Exception as e:
        logging.error("Issue 作成中にエラーが発生しました。タイトル: %s", title)
        logging.exception(e)
        raise e

def main():
    logging.info("スクリプト開始")
    
    # 環境変数の読み込み
    openai_api_key = os.environ.get("OPENAI_API_KEY")
    github_token = os.environ.get("GITHUB_TOKEN")
    github_repo_full = os.environ.get("GITHUB_REPOSITORY")  # "owner/repo" 形式

    if not openai_api_key:
        logging.error("OPENAI_API_KEY が設定されていません。")
        raise Exception("OPENAI_API_KEY が設定されていません。")
    if not github_token:
        logging.error("GITHUB_TOKEN が設定されていません。")
        raise Exception("GITHUB_TOKEN が設定されていません。")
    if not github_repo_full:
        logging.error("GITHUB_REPOSITORY が設定されていません。")
        raise Exception("GITHUB_REPOSITORY が設定されていません。")
    
    logging.info("環境変数の読み込み完了。GITHUB_REPOSITORY: %s", github_repo_full)
    
    # GitHubクライアントの初期化
    g = Github(github_token)
    try:
        repo = g.get_repo(github_repo_full)
    except Exception as e:
        logging.error("リポジトリの取得に失敗しました: %s", github_repo_full)
        logging.exception(e)
        raise e

    # タスクリストファイルの読み込み
    tasks_file = "tasks.md"
    if not os.path.exists(tasks_file):
        tasks_file = "tasks.txt"
        if not os.path.exists(tasks_file):
            logging.error("タスクリストファイル (tasks.md または tasks.txt) が見つかりません。")
            raise Exception("タスクリストファイル (tasks.md または tasks.txt) が見つかりません。")
    
    with open(tasks_file, "r", encoding="utf-8") as f:
        tasks = [line.strip() for line in f if line.strip()]
    logging.info("タスクリスト読み込み完了。タスク数: %d", len(tasks))
    
    # 各タスクごとにIssue生成
    for task in tasks:
        logging.info("Processing task: %s", task)
        try:
            title, body = generate_issue_content(task)
            if not title or not body:
                logging.warning("タイトルまたは本文が生成されなかったため、スキップします。タスク: %s", task)
                continue
            create_issue(title, body, repo)
        except Exception as e:
            logging.error("タスク処理中にエラーが発生しました: %s", task)
            logging.exception(e)
    
    logging.info("スクリプト終了")

if __name__ == "__main__":
    main()
