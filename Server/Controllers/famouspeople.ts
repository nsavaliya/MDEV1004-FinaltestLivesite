import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import mongoose from 'mongoose';

import User from '../Models/user';

import famouspeople from '../Models/famouspeople';

import { GenerateToken } from '../Util/index';

// Utility Function
function SanitizeArray(unsanitizedValue: string | string[]): string[] 
{
    if (Array.isArray(unsanitizedValue)) 
    {
        return unsanitizedValue.map((value) => value.trim());
    } else if (typeof unsanitizedValue === "string") 
    {
        return unsanitizedValue.split(",").map((value) => value.trim());
    } else {
        return [];
    }
}

/* Authentication Functions */

export function ProcessRegistration(req:Request, res:Response, next:NextFunction): void
{
    // instantiate a new user object
    let newUser = new User
    ({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName 
    });

    User.register(newUser, req.body.password, (err) => 
    {
        if(err instanceof mongoose.Error.ValidationError)
        {
            console.error('All Fields Are Required');
            return res.json({success: false, msg: 'ERROR: User Not Registered. All Fields Are Required'});
        }


        if(err){
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
               console.error('Error: User Already Exists');
            }
            return res.json({success: false, msg: 'User not Registered Successfully!'});
        }
        // if we had a front-end (Angular, React or a Mobile UI)...
        return res.json({success: true, msg: 'User Registered Successfully!'});
    });
}

export function ProcessLogin(req:Request, res:Response, next:NextFunction): void
{
    passport.authenticate('local', (err:any, user:any, info:any) => {
        // are there server errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }

        // are the login errors?
        if(!user)
        {
			return res.json({success: false, msg: 'ERROR: User Not Logged in.'});
        }

        req.logIn(user, (err) =>
        {
            // are there db errors?
            if(err)
            {
                console.error(err);
                res.end(err);
            }

            const authToken = GenerateToken(user);

            return res.json({success: true, msg: 'User Logged In Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                emailAddress: user.emailAddress
            }, token: authToken});
        });
        return;
    })(req, res, next);
}

export function ProcessLogout(req:Request, res:Response, next:NextFunction): void
{
    req.logout(() =>{
        console.log("User Logged Out");
    });
    
    // if we had a front-end (Angular, React or Mobile UI)...
    res.json({success: true, msg: 'User Logged out Successfully!'});

}


/* API Functions */
export function DisplayfamouspeopleList(req: Request, res: Response, next: NextFunction): void
{
    famouspeople.find({})
    .then(function(data)
    {
        res.status(200).json({success: true, msg: "famouspeople List Displayed Successfully", data: data});
    })
    .catch(function(err)
    {
        console.error(err);
        res.status(500).json({success: false, msg: "ERROR: Something Went Wrong", data: null});
    });
}

export function DisplayfamouspeopleByID(req: Request, res: Response, next: NextFunction): void
{
    try
    {
        let id = req.params.id;
        famouspeople.findById({_id: id})
        .then(function(data)
        {
            if(data)
            {
                res.status(200).json({success: true, msg: "famouspeople Retrieved by ID Successfully", data: data});
            }
            else
            {
                res.status(404).json({success: false, msg: "famouspeople ID Not Found", data: data});
            }
            
        })
        .catch(function(err)
        {
            console.error(err);
            res.status(400).json({success: false, msg: "ERROR: famouspeople ID not formatted correctly", data: null});
        });
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({success: false, msg: "ERROR: Something Went Wrong", data: null});
    }
}

export function Addfamouspeople(req: Request, res: Response, next: NextFunction): void
{
    try
    {
      
        let achievements = SanitizeArray(req.body.achievements);
    
        let Famouspeople = new famouspeople({
           name: req.body.name,
           occupation: req.body.occupation,
           nationality: req.body.nationality,
           birthDate: req.body.birthDate,
           birthPlace: req.body.birthPlace,
           bio: req.body.bio,
           achievements: achievements,
           imageURL: req.body.imageURL
        });
    
        famouspeople.create(Famouspeople)
        .then(function()
        {
            res.status(200).json({success: true, msg: "famouspeople Added Successfully", data:Famouspeople});
        })
        .catch(function(err)
        {
            console.error(err);
            if(err instanceof mongoose.Error.ValidationError)
            {
                res.status(400).json({success: false, msg: "ERROR: famouspeople Not Added. All Fields are required", data:null});
            }
            else
            {
                res.status(400).json({success: false, msg: "ERROR: famouspeople Not Added.", data:null});
            }
        });
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({success: false, msg: "Something Went Wrong", data: null});
    }
}

export function Updatefamouspeople(req: Request, res: Response, next: NextFunction): void
{
    try
    {
        let id = req.params.id;
        let achievements = SanitizeArray(req.body.achievements);
    
    
        let famouspeopleToUpdate = new famouspeople({
           _id: id,
           name: req.body.name,
           occupation: req.body.occupation,
           nationality: req.body.nationality,
           birthDate: req.body.birthDate,
           birthPlace: req.body.birthPlace,
           bio: req.body.bio,
           achievements: achievements,
           imageURL: req.body.imageURL
        });
    
        famouspeople.updateOne({_id: id}, famouspeopleToUpdate)
        .then(function()
        {
            res.status(200).json({success: true, msg: "famouspeople Updated Successfully", data:famouspeopleToUpdate});
        })
        .catch(function(err)
        {
            console.error(err);
            if(err instanceof mongoose.Error.ValidationError)
            {
                res.status(400).json({success: false, msg: "ERROR: famouspeople Not Updated. All Fields are required", data:null});
            }
            else
            {
                res.status(400).json({success: false, msg: "ERROR: famouspeople Not Updated.", data:null});
            }
        });
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({success: false, msg: "Something Went Wrong", data: null});
    }
}

export function Deletefamouspeople(req: Request, res: Response, next: NextFunction): void
{
    try
    {
        let id = req.params.id;

        famouspeople.deleteOne({_id: id})
        .then(function()
        {
            res.status(200).json({success: true, msg: "famouspeople Deleted Successfully", data:id});
        })
        .catch(function(err)
        {
            console.error(err);
            res.status(400).json({success: false, msg: "ERROR: famouspeople ID not formatted correctly", data: null});
        });
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({success: false, msg: "ERROR: Something Went Wrong", data: null});
    }
}