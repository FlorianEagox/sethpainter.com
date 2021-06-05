import router from 'express';
import monk from 'monk'

export const mailinglist = router.Router();
const db = monk('mongodb://localhost/sethpainter');

mailinglist.get('/add/:email', async (req, res) => {
	if(!/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i.test(req.params.email)) { // Test if the email is valid
		res.status(400).send('Invalid email address');
		return;
	}
	const mailing_list = db.get('mailing_list');
	if((await mailing_list.find({email: req.params.email})).length) { // Test if the email is already in the db
		res.status(401).send('Email already part of the mailing list');
		return;
	}
	await mailing_list.insert({
		email: req.params.email,
		time_joined: Date.now()
	});
	db.close();
	res.send(`${req.params.email} Added to mailing list`);
});
mailinglist.get('/remove/:email', async (req, res) => {
	const mailing_list = db.get('mailing_list');
	const removed = await mailing_list.remove({email: req.params.email});
	db.close();
	res.redirect(`https://sethpainter.com/leavemailinglist/?email=${removed.deletedCount ? req.params.email : 'none'}`);
});
