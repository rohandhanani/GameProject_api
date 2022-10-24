const nodemailer = require("nodemailer");
const userData = require("../model/user.model");
const smtpTransport = require('nodemailer-smtp-transport');
const APIResponse = require("../helpers/APIResponse");
const date = require('date-and-time');

let otp = Math.floor(1000 + Math.random() * 9000);

// User Register //
exports.userRegister = async (req, res) => {
    try {

        phone = req.body.phone;
        password = req.body.password;
        email = req.body.email;

        const now = new Date();
        const createDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');


        userData.findOne({ phone: phone }).then(async (userphone) => {
            if (userphone) {
                return res
                    .status(404)
                    .json(APIResponse.error("Phone Number Is Already save.", res.statusCode));
            } else {
                const data = new userData({
                    phone: phone,
                    password: password,
                    email: email,
                    createDate: createDate
                })

                await data.save(async function (err, result) {
                    if (err) {
                        return res
                            .status(404)
                            .json(APIResponse.error("Error While User Registration.", res.statusCode));
                    } else {
                        const transport = nodemailer.createTransport(smtpTransport({
                            service: 'gmail',
                            auth: {
                                // user: process.env.USER_EMAIL, // please enter your email address.//
                                // pass: process.env.EMAIL_PASS, // please enter your email address password.//
                                user: "testabctest47@gmail.com",
                                pass: "wcdyytsexohrgfdi"

                            },
                        }));

                        const mailoption = {
                            // from: process.env.USER_EMAIL, // please enter your email address.//
                            from: "testabctest47@gmail.com",
                            to: req.body.email,
                            subject: "send otp in your email",
                            text: `Your otp is :- ${otp}, please don't give other person for your safety.`,
                        };

                        transport.sendMail(mailoption);

                        return res
                            .status(200)
                            .json(APIResponse.success("User Registration Successfully", res.statusCode, data));
                    }
                });
            }
        });
    } catch (error) {
        return res
            .status(404)
            .json(APIResponse.error("Error While User Registration.", res.statusCode));
    }
}

// Check Otp //
exports.checkOtp = async (req, res) => {
    try {
        var otp1 = req.body.otp;

        if (otp1 == otp) {
            return res
                .status(200)
                .json(APIResponse.success("OTP Matched.", res.statusCode));
        } else {
            return res
                .status(200)
                .json(APIResponse.success("OTP Does Not Matched.", res.statusCode));
        }
    } catch (error) {
        return res
            .status(404)
            .json(APIResponse.error("OTP Not Matched.", res.statusCode));
    }
};

// User Login //
exports.userLogin = async (req, res) => {
    try {
        var phone = req.body.phone;
        var password = req.body.password;

        var data = await userData.findOne({ phone });

        if (data == null) {
            return res
                .status(404)
                .json(APIResponse.error("Enter Valid Username Or Password.", res.statusCode));
        } else {
            if (password === data.password && phone === data.phone) {
                return res
                    .status(200)
                    .json(APIResponse.success("User Login Successfully.", res.statusCode));
            } else {
                return res
                    .status(404)
                    .json(APIResponse.error("Enter Valid Username Or Password.", res.statusCode));
            }
        }
    } catch (error) {
        return res
            .status(404)
            .json(APIResponse.error("User Not Login.", res.statusCode));
    }
};