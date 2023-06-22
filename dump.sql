create database pokemon;

create table users (
	id serial primary key,
  name varchar(60) not null,
  email varchar(180) not null unique,
  password text not null
);

create table monsters (
	id serial primary key,
  user_id int references users(id),
  name varchar(60) not null,
  skills text not null,
  image text,
  nickname varchar(60)
);