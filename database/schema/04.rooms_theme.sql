CREATE TABLE rooms_theme (
  id int auto_increment primary key,
  rooms_id int not null,
  theme_id int not null,
  foreign key(rooms_id) references rooms(id) on delete cascade, 
  foreign key(theme_id) references theme(id) on delete cascade
);