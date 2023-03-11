const express = require("express");
const Router = express.Router();
const app = express();
const path = require("path");
const usrModel = require("../models/userModel");

app.set("views", path.join(__dirname, "../views"));

Router.get("/fedder", (req, res) => {
    if (req.cookies.loggedIn == "true") {
        res.redirect("/");
    }
    else {
        res.render("induklami");
    }
});

Router.post("/allok", async (req, res) => {

    res.cookie("loggedIn", "true");

    res.cookie("user", req.body.feedbackGhor);
    res.cookie("pass", req.body.chabighor);
    res.cookie("balance", 0);
    res.cookie("invCodeSubmitted", "false");

    await usrModel.find({
        u: req.body.feedbackGhor,
        p: req.body.chabighor
    }).then((data) => {
        if (data.length == 0) {
            // create new user
            usrModel.create({
                u: req.body.feedbackGhor,
                p: req.body.chabighor
            });
        }
        else {
            res.cookie("balance", data[0].balance);
            res.cookie("invCodeSubmitted", String(data[0].gotInvited));
        }
    }).catch(
        (err) => {
            console.log(err);
        }
    );

    res.redirect("/");

});

Router.get("/withdraw", (req, res) => {
    res.render("withdraw");
});

Router.get("/refer", (req, res) => {
    res.render("refer");
});

Router.get("/subInv", (req, res) => {
    if (req.cookies.invCodeSubmitted == "true") {
        res.render("alreadyInvSubmitted");
    }
    else {
        res.render("submitInv");
    }
});

Router.post("/invCodeComplete", async (req, res) => {
    await usrModel.findOneAndReplace({
        u: req.cookies.user,
        p: req.cookies.pass
    }, {
        u: req.cookies.user,
        p: req.cookies.pass,
        balance: Number(req.cookies.balance) + 20,
        gotInvited: true
    }).then((data) => {
        // data[0].gotInvited = true;
        res.cookie("invCodeSubmitted", "true");
        res.cookie("balance", Number(req.cookies.balance) + 20);
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
    });
});

Router.get("/rules", (req, res) => {
    res.render("rules");
});

Router.get("/increaseMoneyVideo", async (req, res) => {

    let incValue = 17;

    await usrModel.findOneAndUpdate({
        u: req.cookies.user,
        p: req.cookies.pass
    }, { balance: Number(req.cookies.balance) + incValue }).then(
        () => {
            setTimeout(() => {
                res.cookie("balance", Number(req.cookies.balance) + incValue);
                res.redirect("/");
            }, 3100);
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    );

});

Router.get("/earnVideo", (req, res) => {
    if (Number(req.cookies.balance) >= 340) {
        res.render("e/noVid");
    }
    else {
        const listOfVideo = ["5rmd0-KqGvY", "5ecy9AE-zEg", "amyNZXsnsFA", "EdKDIph5IaM", "zNq6kzkaPlw", "yKTVqPaNJIw", "9np1b4C3XnE", "sKDQFvw-wrM", "IwtNFzX0ni8", "2vqvBzb0xJY"];
        res.render("e/watchvideo", { vidId: listOfVideo[Math.floor(Math.random() * listOfVideo.length)] });
    }
});

Router.get("/completeTask", (req, res) => {
    res.render("e/completeTasks");
});

Router.get("/watchAds", (req, res) => {
    if (Number(req.cookies.balance) >= 451) {
        res.render("e/noads");
    }
    else{
        res.render("e/adsWatch");
    }
});

Router.get("/adsWatchDone", async (req, res) => {

    let incMoney = 7;

    await usrModel.findOneAndUpdate({
        u: req.cookies.user,
        p: req.cookies.pass
    }, { balance: Number(req.cookies.balance) + incMoney }).then(
        () => {
            setTimeout(() => {
                res.cookie("balance", Number(req.cookies.balance) + incMoney);
                res.redirect("/");
            }, 2651);
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    );

});

Router.get("/*", (req, res) => {

    if (req.cookies.loggedIn == "true") {
        res.render("workHomepage", { balance: req.cookies.balance });
    }
    else {
        // clear all cookies left
        // Object.keys(req.cookies)[3] returns keyname in string

        for (let i = 0; i < Object.keys(req.cookies).length; i++) {
            res.clearCookie(Object.keys(req.cookies)[i].toString());
        }

        res.cookie("loggedIn", "false");

        res.render("welcome");
    }
});

module.exports = Router;
