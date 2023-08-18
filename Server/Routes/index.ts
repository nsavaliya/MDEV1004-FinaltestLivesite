import express from 'express';
let router = express.Router();
import passport from 'passport';

/* Get the famouspeople Controller */
import { DisplayfamouspeopleList, DisplayfamouspeopleByID, Addfamouspeople, Updatefamouspeople, Deletefamouspeople, ProcessRegistration, ProcessLogin, ProcessLogout  } from '../Controllers/famouspeople';

router.get('/list', passport.authenticate('jwt', {session: false}), (req, res, next) => DisplayfamouspeopleList(req, res, next));

router.get('/find/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => DisplayfamouspeopleByID(req, res, next));

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => Addfamouspeople(req, res, next));

router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => Updatefamouspeople(req, res, next));

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => Deletefamouspeople(req, res, next));

// Authentication routes
router.post('/register', (req, res, next) => ProcessRegistration(req, res, next));

router.post('/login', (req, res, next) => ProcessLogin(req, res, next));

router.get('/logout', (req, res, next) => ProcessLogout(req, res, next));

export default router;
