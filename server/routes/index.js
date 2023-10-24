const express = require('express');
const router = express.Router({});

router.use('/users', require('../modules/users/users.route'));
router.use('/staffs', require('../modules/staffs/satffs.route'));
router.use('/manage/staffs', require('../modules/staffs/manage-staffs.route'));
router.use('/manage/permissions', require('../modules/permissions/manage-permissions.route'));
router.use('/manage/room-types', require('../modules/room-types/manage-room-types.route'));
router.use('/manage/rooms', require('../modules/rooms/manage-rooms.route'));
router.use('/manage/services', require('../modules/services/manage-services.route'));
router.use('/manage/foods', require('../modules/foods/manage-foods.route'));
router.use('/manage/staff-activities', require('../modules/staff-activities/manage-staff-activities.route'));
router.use('/foods', require('../modules/foods/foods.route'));
router.use('/rooms', require('../modules/rooms/rooms.route'));
router.use('/schedules', require('../modules/schedule/schedule.route'));
router.use('/bookings', require('../modules/bookings/booking.route'));
router.use('/booking-services', require('../modules/booking-services/booking-service.route'));
router.use('/order-foods', require('../modules/order-foods/order-foods.route'));
router.use('/bills', require('../modules/bills/bills.route'));
router.use('/users-order-foods', require('../modules/users-order-foods/users-order-foods.route'));
router.use('/services', require('../modules/services/services.route'));
router.use('/staff-activities', require('../modules/staff-activities/staff-activities.route'));
router.use('/booking-foods', require('../modules/booking-foods/booking-foods.route'));
router.use('/reports', require('../modules/report/report.route'));

module.exports = router;
