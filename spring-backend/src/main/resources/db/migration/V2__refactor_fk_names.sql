ALTER TABLE subscription
    ADD category_id BIGINT NULL;

ALTER TABLE subscription
    ADD period_id BIGINT NULL;

ALTER TABLE subscription
    MODIFY category_id BIGINT NOT NULL;

ALTER TABLE subscription
    MODIFY period_id BIGINT NOT NULL;

ALTER TABLE subscription
    ADD CONSTRAINT FK_SUBSCRIPTION_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES category (id);

ALTER TABLE subscription
    ADD CONSTRAINT FK_SUBSCRIPTION_ON_PERIOD FOREIGN KEY (period_id) REFERENCES period (id);

ALTER TABLE subscription
    DROP FOREIGN KEY FK_SUBSCRIPTION_ON_CATEGORIES;

ALTER TABLE subscription
    DROP FOREIGN KEY FK_SUBSCRIPTION_ON_PERIODS;

ALTER TABLE subscription
    DROP COLUMN categories_id;

ALTER TABLE subscription
    DROP COLUMN periods_id;