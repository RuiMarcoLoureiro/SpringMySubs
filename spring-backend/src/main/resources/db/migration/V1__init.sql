CREATE TABLE category
(
    id   BIGINT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255)          NOT NULL,
    CONSTRAINT pk_category PRIMARY KEY (id)
);

CREATE TABLE periods
(
    id   BIGINT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255)          NOT NULL,
    CONSTRAINT pk_periods PRIMARY KEY (id)
);

CREATE TABLE `role`
(
    id   BIGINT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255)          NULL,
    CONSTRAINT pk_role PRIMARY KEY (id)
);

CREATE TABLE subscription
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    name          VARCHAR(255)          NOT NULL,
    cost          DOUBLE                NOT NULL,
    periods_id    BIGINT                NOT NULL,
    categories_id BIGINT                NOT NULL,
    CONSTRAINT pk_subscription PRIMARY KEY (id)
);

CREATE TABLE subscription_user
(
    id              BIGINT AUTO_INCREMENT NOT NULL,
    accepted        BIT(1)                NOT NULL,
    user_id         BIGINT                NOT NULL,
    subscription_id BIGINT                NOT NULL,
    CONSTRAINT pk_subscriptionuser PRIMARY KEY (id)
);

CREATE TABLE user
(
    id       BIGINT AUTO_INCREMENT NOT NULL,
    username VARCHAR(255)          NOT NULL,
    password VARCHAR(255)          NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE users_roles
(
    role_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT pk_users_roles PRIMARY KEY (role_id, user_id)
);

ALTER TABLE subscription_user
    ADD CONSTRAINT FK_SUBSCRIPTIONUSER_ON_SUBSCRIPTION FOREIGN KEY (subscription_id) REFERENCES subscription (id);

ALTER TABLE subscription_user
    ADD CONSTRAINT FK_SUBSCRIPTIONUSER_ON_USER FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE subscription
    ADD CONSTRAINT FK_SUBSCRIPTION_ON_CATEGORIES FOREIGN KEY (categories_id) REFERENCES category (id);

ALTER TABLE subscription
    ADD CONSTRAINT FK_SUBSCRIPTION_ON_PERIODS FOREIGN KEY (periods_id) REFERENCES periods (id);

ALTER TABLE users_roles
    ADD CONSTRAINT fk_userol_on_role FOREIGN KEY (role_id) REFERENCES `role` (id);

ALTER TABLE users_roles
    ADD CONSTRAINT fk_userol_on_user FOREIGN KEY (user_id) REFERENCES user (id);