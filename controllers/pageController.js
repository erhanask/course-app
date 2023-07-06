exports.getIndex = (req, res) => {
    res.render('index');
};

exports.getAbout = (req, res) => {
    res.render('about');
}

exports.getLogin = (req, res) => {
    res.render('login');
}

exports.getContact = (req, res) => {
    res.render('contact');
}

exports.sendContact = async (req, res) => {
    const nodemailer = require('nodemailer');
    const {email, first_name, last_name, phone, comments} = req.body;

    var transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: email,
        to: process.env.MAIL_CONTACT_ADMIN,
        subject: 'Contact From Course CMS',
        text: comments+'\n\n'+first_name+' '+last_name+'\n'+phone
    };

    try {
        await transport.sendMail(mailOptions);
        res.status(200).json({
            status: 'success',
            message: 'Message sent successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}