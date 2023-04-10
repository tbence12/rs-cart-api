create extension if not exists "uuid-ossp";

create table "user" (
	id uuid not null default uuid_generate_v4() primary key,
	username text not null
);

create type cart_status as enum('OPEN', 'ORDERED');

create table cart (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null references "user"(id),
	created_at date not null default CURRENT_DATE,
	updated_at date not null default CURRENT_DATE,
	status cart_status
);

create table cart_item (
	cart_id uuid not null references cart(id),
	product_id uuid not null,
	"count" integer not null
);

create table "order" (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null references "user"(id),
	cart_id uuid not null references cart(id),
	payment JSON not null,
	delivery JSON not null,
	"comments" text not null,
	status text not null,
	total integer not null
);

insert into "user" (username) values ('user1');
insert into "user" (username) values ('user2');

insert into cart (user_id, status) values ('bfb193c5-9942-4970-8938-9b86d7c71181', 'OPEN');
insert into cart (user_id, status) values ('7f3cfd8e-f16b-4cfc-b2ff-97aa60167e0e', 'ORDERED');

insert into cart_item (cart_id, product_id, "count") values ('25b4943a-b298-4bac-8371-7f39413fa458', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 3);
insert into cart_item (cart_id, product_id, "count") values ('25b4943a-b298-4bac-8371-7f39413fa458', '7567ec4b-b10c-48c5-9345-fc73c48a80a3', 1);
insert into cart_item (cart_id, product_id, "count") values ('0a7113c6-4933-458e-8a9b-9cec7ffc14c2', '7567ec4b-b10c-48c5-9345-fc73c48a80a1', 2);

insert into "order" (user_id, cart_id, payment, delivery, "comments", status, total) values ('7f3cfd8e-f16b-4cfc-b2ff-97aa60167e0e', '0a7113c6-4933-458e-8a9b-9cec7ffc14c2', '{"type": "card"}', '{"code": "A001"}', '-', 'DELIVERED', 30);

select * from "user";

select * from cart;

SELECT * FROM cart_item;

SELECT * FROM cart_item WHERE cart_id='0a7113c6-4933-458e-8a9b-9cec7ffc14c2';
INSERT INTO cart_item (cart_id, product_id, "count") VALUES ('0a7113c6-4933-458e-8a9b-9cec7ffc14c2', '7567ec4b-b10c-48c5-9345-fc73c48a80a3', 4) RETURNING *;
DELETE FROM cart_item WHERE cart_id='25b4943a-b298-4bac-8371-7f39413fa458' AND product_id='7567ec4b-b10c-48c5-9345-fc73c48a80aa' RETURNING *;
UPDATE cart_item SET "count"=6 WHERE cart_id='25b4943a-b298-4bac-8371-7f39413fa458' AND product_id='7567ec4b-b10c-48c5-9345-fc73c48a80aa' RETURNING *;
