CREATE TABLE "staffs" (
  "id" SERIAL PRIMARY KEY,
  "fullName" varchar,
  "userName" varchar,
  "password" varchar,
  "email" varchar,
  "phoneNumber" varchar,
  "permissionId" int,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "permissions" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "code" varchar,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "staffActivities" (
  "id" SERIAL PRIMARY KEY,
  "staffId" int,
  "name" varchar,
  "description" varchar,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "schedule" (
  "id" SERIAL PRIMARY KEY,
  "staffId" int,
  "creatorId" int,
  "notes" varchar,
  "startDate" timestamp,
  "endDate" timestamp,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "rooms" (
  "id" int PRIMARY KEY,
  "code" varchar,
  "typeId" int,
  "isBooked" bool,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "roomTypes" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "code" varchar,
  "price" float,
  "numOfBeds" int,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "fullName" varchar,
  "address" varchar,
  "phoneNumber" varchar,
  "identityId" varchar,
  "identityType" varchar,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "bookings" (
  "id" int PRIMARY KEY,
  "roomId" int,
  "userId" int,
  "staffId" int,
  "price" float,
  "description" varchar,
  "startDate" timestamp,
  "endDate" timestamp,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "bills" (
  "id" int PRIMARY KEY,
  "bookingId" int,
  "amount" float,
  "notes" varchar,
  "paymentType" varchar,
  "paymentDate" timestamp,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "services" (
  "id" int PRIMARY KEY,
  "name" int,
  "type" varchar,
  "price" float,
  "description" varchar,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "bookingServices" (
  "id" int PRIMARY KEY,
  "bookingId" int,
  "serviceId" int,
  "staffId" int,
  "number" int,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "foods" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "type" varchar,
  "group" varchar,
  "price" float,
  "description" varchar,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "orderFoods" (
  "id" int PRIMARY KEY,
  "bookingFoodsId" int,
  "foodId" int,
  "number" int,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "bookingFoods" (
  "id" int PRIMARY KEY,
  "bookingId" int,
  "staffId" int,
  "isConfirmed" bool,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "usersOrders" (
  "id" int PRIMARY KEY,
  "userFullName" varchar,
  "staffId" int,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "usersOrderFoods" (
  "id" int PRIMARY KEY,
  "usersOrderId" int,
  "foodId" int,
  "number" int,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

CREATE TABLE "foodBills" (
  "id" int PRIMARY KEY,
  "usersOrderId" int,
  "amount" float,
  "notes" varchar,
  "paymentType" varchar,
  "paymentDate" timestamp,
  "updatedAt" timestamp,
  "createdAt" timestamp
);

ALTER TABLE "staffs" ADD FOREIGN KEY ("permissionId") REFERENCES "permissions" ("id");

ALTER TABLE "staffActivities" ADD FOREIGN KEY ("staffId") REFERENCES "staffs" ("id");

ALTER TABLE "schedule" ADD FOREIGN KEY ("staffId") REFERENCES "staffs" ("id");

ALTER TABLE "schedule" ADD FOREIGN KEY ("creatorId") REFERENCES "staffs" ("id");

ALTER TABLE "rooms" ADD FOREIGN KEY ("typeId") REFERENCES "roomTypes" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("roomId") REFERENCES "rooms" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("staffId") REFERENCES "staffs" ("id");

ALTER TABLE "bills" ADD FOREIGN KEY ("bookingId") REFERENCES "bookings" ("id");

ALTER TABLE "bookingServices" ADD FOREIGN KEY ("bookingId") REFERENCES "bookings" ("id");

ALTER TABLE "bookingServices" ADD FOREIGN KEY ("serviceId") REFERENCES "services" ("id");

ALTER TABLE "bookingServices" ADD FOREIGN KEY ("staffId") REFERENCES "staffs" ("id");

ALTER TABLE "orderFoods" ADD FOREIGN KEY ("bookingFoodsId") REFERENCES "bookingFoods" ("id");

ALTER TABLE "orderFoods" ADD FOREIGN KEY ("foodId") REFERENCES "foods" ("id");

ALTER TABLE "bookingFoods" ADD FOREIGN KEY ("bookingId") REFERENCES "bookings" ("id");

ALTER TABLE "bookingFoods" ADD FOREIGN KEY ("staffId") REFERENCES "staffs" ("id");

ALTER TABLE "usersOrders" ADD FOREIGN KEY ("staffId") REFERENCES "staffs" ("id");

ALTER TABLE "usersOrderFoods" ADD FOREIGN KEY ("foodId") REFERENCES "foods" ("id");

ALTER TABLE "usersOrderFoods" ADD FOREIGN KEY ("usersOrderId") REFERENCES "usersOrders" ("id");

ALTER TABLE "foodBills" ADD FOREIGN KEY ("usersOrderId") REFERENCES "usersOrders" ("id");
