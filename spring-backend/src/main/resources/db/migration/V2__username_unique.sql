ALTER TABLE user
    ADD CONSTRAINT uc_user_username UNIQUE (username);