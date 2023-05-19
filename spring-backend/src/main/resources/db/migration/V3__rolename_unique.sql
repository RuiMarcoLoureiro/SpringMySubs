ALTER TABLE `role`
    ADD CONSTRAINT uc_role_name UNIQUE (name);

ALTER TABLE `role`
    MODIFY name VARCHAR(255) NOT NULL;