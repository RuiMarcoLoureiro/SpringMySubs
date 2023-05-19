ALTER TABLE category
    ADD created_at datetime NULL;

ALTER TABLE category
    ADD updated_at datetime NULL;

ALTER TABLE period
    ADD created_at datetime NULL;

ALTER TABLE period
    ADD updated_at datetime NULL;

ALTER TABLE `role`
    ADD created_at datetime NULL;

ALTER TABLE `role`
    ADD updated_at datetime NULL;

ALTER TABLE subscription
    ADD created_at datetime NULL;

ALTER TABLE subscription
    ADD updated_at datetime NULL;

ALTER TABLE subscription_user
    ADD created_at datetime NULL;

ALTER TABLE subscription_user
    ADD updated_at datetime NULL;

ALTER TABLE user
    ADD created_at datetime NULL;

ALTER TABLE user
    ADD updated_at datetime NULL;

ALTER TABLE subscription_user
    DROP COLUMN id;

ALTER TABLE subscription_user
    ADD PRIMARY KEY (subscription_id, user_id);