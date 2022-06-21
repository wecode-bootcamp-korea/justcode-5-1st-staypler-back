CREATE TABLE users (
  id int auto_increment primary key,
  email varchar(200) not null unique,
  name varchar(100) not null,
  password varchar(200) not null,
  phone varchar(100) not null,
  profile_image_url varchar(2000),
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp on update current_timestamp
);