\encoding UTF8;
-- INSERT INTO user_skills
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('c7864adb-063c-41f9-a53f-d2c06c7b617c', 'skill_python', '3.10') ON CONFLICT (user_id, skill_id) DO NOTHING;
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('c7864adb-063c-41f9-a53f-d2c06c7b617c', 'skill_pytorch', '1.12') ON CONFLICT (user_id, skill_id) DO NOTHING;
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('c7864adb-063c-41f9-a53f-d2c06c7b617c', 'skill_fastapi', '0.80') ON CONFLICT (user_id, skill_id) DO NOTHING;
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('c7864adb-063c-41f9-a53f-d2c06c7b617c', 'skill_postgresql', '15') ON CONFLICT (user_id, skill_id) DO NOTHING;
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('c7864adb-063c-41f9-a53f-d2c06c7b617c', 'skill_docker', NULL) ON CONFLICT (user_id, skill_id) DO NOTHING;
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('c7864adb-063c-41f9-a53f-d2c06c7b617c', 'skill_kubernetes', NULL) ON CONFLICT (user_id, skill_id) DO NOTHING;
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('898b4727-372b-4d99-982a-6099e3cb4b8f', 'skill_googlecloud', NULL) ON CONFLICT (user_id, skill_id) DO NOTHING;
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('898b4727-372b-4d99-982a-6099e3cb4b8f', 'skill_aws', NULL) ON CONFLICT (user_id, skill_id) DO NOTHING;
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('898b4727-372b-4d99-982a-6099e3cb4b8f', 'skill_terraform', NULL) ON CONFLICT (user_id, skill_id) DO NOTHING;
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('898b4727-372b-4d99-982a-6099e3cb4b8f', 'skill_circleci', NULL) ON CONFLICT (user_id, skill_id) DO NOTHING;
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('898b4727-372b-4d99-982a-6099e3cb4b8f', 'skill_bert', NULL) ON CONFLICT (user_id, skill_id) DO NOTHING;
INSERT INTO user_skills (user_id, skill_id, version) VALUES ('898b4727-372b-4d99-982a-6099e3cb4b8f', 'skill_linux', NULL) ON CONFLICT (user_id, skill_id) DO NOTHING;
