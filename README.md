# El7a2ni Pharmacy: A virtual online Pharmacy

El7a2ni Pharmacy is a virtual online Pharmacy platform that enables patients and pharmacists to communicate and streamline the usually tedious process of buying medicines

---

# Section 1: Brief

## 1.1 | Motiviation:

This project was motivated by the very dire need for a more accessible way of buying medicines and contacting pharmacists unlike what is usually present in the real world. Most traditional pharmacies are usually limited by how many patients they can serve at the same time and how many of the staff is able to work on any given day. Most tasks have the ability to be automated and streamlined using software solutions that will subsequently increase the capacity of pharmacies to serve more patients and the ability of patients to communicate with more pharmacists effeciently.

## 1.2 | Build Status:

Currently the system is working as expected, all functionalities including the more sophisticated ones like video calling, live chatting, booking visits and downloading prescriptions are running with no known issues. Currently if any user is using a _**Chromium based**_ web browser; they will need to run a custom command through termninal on their machine:

| Windows                                                                                                   | MacOS                                                                                                                              |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://www.pngall.com/wp-content/uploads/10/Windows-11-PNG-File.png" width="100" height="100"> | <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png" width="100" height="100">             |
| `chrome.exe --disable-web-security --user-data-dir="C:\temp"`                                             | `open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="<path>" --disable-web-security` |
| **Win+R**                                                                                                 | From Terminal                                                                                                                      |

## 1.3 | Code Style:

The code style is enforced using eslint and prettier, both are plugins installed in VS-Code to manage the overall code cleanliness and follow usual conventions in web development.

Prettier link: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Eslint link: [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

## 1.4 | Tech and frameworks:

|                                                      |                                                                                                                      |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [React](https://reactjs.org/)                        | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                  |
| [Node.js](https://nodejs.org/en/)                    | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)              |
| [JWT](https://jwt.io/)                               | ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)                          |
| [Express](https://expressjs.com/)                    | ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=blue)           |
| [MongoDB](https://www.mongodb.com/)                  | ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)      |
| [Mongoose](https://mongoosejs.com/)                  | ![Mongoose](https://img.shields.io/badge/Mongoose-black.svg?style=for-the-badge&logo=mongoose&logoColor=orange)      |
| [Material-UI](https://material-ui.com/)              | ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)                  |
| [Stripe](https://stripe.com/)                        | ![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)                |
| [Git](https://git-scm.com/)                          | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)                  |
| [Github Actions](github.com/features/actions)        | ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)         |
| [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | ![MongoDB](https://img.shields.io/badge/MongoDB%20Atlas-white.svg?style=for-the-badge&logo=mongodb&logoColor=green)  |
| [Postman](https://www.postman.com/)                  | ![Postman](https://img.shields.io/badge/postman-black.svg?style=for-the-badge&logo=postman&logoColor=orange)         |
| [VSCode](https://code.visualstudio.com/)             | ![VScode](https://img.shields.io/badge/VS%20code-black.svg?style=for-the-badge&logo=visualstudiocode&logoColor=blue) |
| [JavaScript](https://www.javascript.com/)            | ![JS](https://img.shields.io/badge/JavaScript-black.svg?style=for-the-badge&logo=javascript&logoColor=yellow)        |

---

# Section 2: Features

## 2.1 | Main features:

> ⚠️: **Note:** Click to expand.


<details>
 <summary> As a Guest user, you can: </summary>
 
-  register as a patient using username, name, email, password, date of birth, gender, mobile number, emergency contact (full name , mobile number, relation to the patient)
-  submit a request to register as a pharmacist using username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background

</details>


<details>    
 <summary> As a Administrator, you can: </summary>
 
 -  view a list of all available medicines with all the relevant details
 -  search for a medicine based on name or medical usage.
 -  view a sales report based on a chosen month.
 -  login using your username and password
 -  logout
 -  add another adminstrator with a set username and password.
 -  remove a pharmacist/patient from the system.
 -  view all of the information uploaded by a pharmacist to apply to join the platform.
 -  accept or reject the request of a pharmacist to join the platform.
 -  change my password
 -  reset a forgotten password through OTP sent to email
 -  view a pharmacist's information.
 -  view a patients's basic information.


</details>

<details>
    
 <summary> As a Pharmacist, you can: </summary>
 
- view a list of all available medicines with all the relevant details
- search for a medicine based on name or medical usage.
- add or edit a medicine with all its relevant details.
- view a sales report based on a chosen month and can further filter it based on medicine/date.
- view his/her wallet balance.
- recevice a notification when a medicine is out of stock via email.
- chat with a Doctor in the clinic.
- chat with a Patient in the pharmacy
- upload and submit required documents upon registration such as ID, pharmacy degree anf Working licenses
- login using your username and password
- logout
- change my password
-  reset a forgotten password through OTP sent to email

  
    
</details>
<details>
    
 <summary> As a Patient, you can: </summary>
 
-  view a list of all available medicines with all the relevant details
-  search for a medicine based on name or medical usage.
-  add medicines to his/her cart if he is eligible to take it.
-  view the medicines in the cart.
-  remove or change the quantity of an item in the cart.
-  checkout his/her order.
-  add a new delivery address or choose from his previous delivery addresses.
-  view his/her wallet balance.
-  pay for his order using his/her wallet balance/credit card/Cash on delivery.
-  view his/her current and past order details and its status.
-  cancel his/her order.
-  view alternative medicines for the medicines currently out of stock.
-  chat with a Pharmacist in the pharmacy.
-  login using your username and password
-  logout
- change my password
-  reset a forgotten password through OTP sent to email


</details>

## 2.2 | Code examples and screenshots:
<details>
 
 <summary>Pharmacist chat with a patient</summary>
 
![image](https://github.com/Skill-IssueSquad/pharmacy/assets/98961039/3ccb12f1-90b6-4937-a6d9-64087fd52143)

</details>


<details>
 
 <summary>Patient can buy medicines</summary>
 
![image](https://github.com/Skill-IssueSquad/pharmacy/assets/98961039/bc8b4d21-946e-4752-863b-88fa892908fd)


</details>


<details>
 <summary>Cart of the patient</summary>
 
![image](https://github.com/Skill-IssueSquad/pharmacy/assets/98961039/7116c799-dde6-4d92-ab50-933af2198f36)

 
</details>


<details>
 <summary>Check out of the patient</summary>
 
![image](https://github.com/Skill-IssueSquad/pharmacy/assets/98961039/c3b1a426-e8f7-4dad-92de-7eaa10dd9f8e)


 
</details>

<details>
 <summary>Patient can view orders</summary>
 
![image](https://github.com/Skill-IssueSquad/pharmacy/assets/98961039/c3b1a426-e8f7-4dad-92de-7eaa10dd9f8e)

 </details>


### Code Examples
<details>
<summary>Get Cart of Patient</summary>

```
const getCart = async (req, res) => {
  const { username } = req.body;
  try {
    const patient = await Patient.findOne({ username: username });
    if (patient != null) {
      return res
        .status(200)
        .json({ success: true, message: "Cart returened", data: patient.cart });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found", data: null });
    }
  } catch (error) {
    const reply = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.status(500).json(reply);
  }
};

```
</details>
<details>
<summary>Remove Medicine From Cart</summary>

```
const removeMedicine = async (req, res) => {
  const { userName, medicineId } = req.body;
  console.log(userName, medicineId);

  try {
    const patient = await Patient.findOne({ username: userName });
    if (patient != null) {
      const cart = patient.cart.medicines;
      const newCart = cart.filter(
        (medicine) => medicine.medicine_id != medicineId
      );
      patient.cart.medicines = newCart;
      await patient.save();

      return res
        .status(200)
        .json({
          success: true,
          message: "Medicine removed",
          data: patient.cart,
        });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found", data: null });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

```
</details>
<details>
<summary>Get Patient</summary>

```

const getPatient = async (req, res) => {
  const { username } = req.body;
  try {
    const patient = await Patient.findOne({ username: username });
    if (patient != null) {
      return res
        .status(200)
        .json({ success: true, message: "Patient returened", data: patient });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found", data: null });
    }
  } catch (error) {
    const reply = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.status(500).json(reply);
  }
};

```
</details>
<details>
<summary>Clear cart of a patient</summary>

```

const clearCart = async (req, res) => {
  const { username } = req.body;

  try {
    const patient = await Patient.findOne({ username: username });

    if (patient == null) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found", data: null });
    } else {
      patient.cart = {};
      await patient.save();

      return res
        .status(200)
        .json({ success: true, message: "Cart Cleared", data: patient.cart });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

```
</details>

# Section 3: How to use

## 3.1 | API's:

> ⚠️: **Note:** Click to expand.

<details>
    <summary>
        Patient Routes (/patient)
    </summary>

    
`router.post('/getPatient' , patientController.getPatient);` fetches a specific patient

`router.post('/cart',patientController.getCart)`  Fetch the user's cart

`router.post('/removeMedicineFromCart' , patientController.removeMedicine)` Removes a medicine from the user's cart

`router.post('/addAddress' , patientController.addAddressToPatient);` adds an address to the list of addresses of the user

`router.post('/addOrder' , patientController.addOrderToPatient);` adds an order to the list of orders for the patient

`router.post('/deleteOrder' , patientController.deleteOrder);` deletes an order for the user

`router.post('/clearCart',patientController.clearCart);` Removes all medicines in the user's cart


`router.post('/saveCart',patientController.saveCart);` takes all the chosen medicinces by the user and add them to the cart

`router.post('/getPrescription/sendPrescriptionMedicinesToPharmacy',patientController.getMedicinesFromClinc);` returns all medicines that are in the prescription of this patient.

`router.post('/addAlternative',patientController.addToCart);` adds a chosen alternative medicine in the cart

</details>


<details>
    <summary>
        Patient Routes (/pharmacist/medicines)
    </summary>

    
` router.post('/',upload.single('image'),AddMedicine);` Create new medicine

`router.get('/',getMedicines);` Gets all medicines

`router.get('/:id',medicinedetailsbyid);` gets all medicine details (by id of that medicine)

`router.patch('/:id', updateMedicine);` updates the details of a specific medicine

`router.post('/archive',archiveMedicine); ` archive/unarchive a specific medicine

`router.post('/viewAlternative',getAlternativeMedicines)` gets all alternatives for a specific medicine based on the main ingredient

`router.post('/getWalletBalance',getWalletBalancepharmacist); ` retrieves the wallet balance of a specific pharmacist 

</details>


<details>
    <summary>
        Doctor Routes (/doctor)
    </summary>

    
`router.post("/createPatient", submitPrescriptionToPharmacy);` The doctor creates an account for the patient and puts the medicine in cart if the patient does not have an account otherwise puts the medicine in the cart directly

`router.get("/chat/getPatients/", getPatients);` fetches a list of all patients that the pharmacist can chat with.

`router.get("/chat/getPharmacist/", getPharmacist);` fetches a list of all pharmacist that a doctor or a patient can chat with.

</details>

<details>
    <summary>
      Admin Routes (/admin)
    </summary>

`router.post("/getAdmin/:username")` Gets an admin with a specified username

`router.get("/viewAdmins")` Views all admins

`router.post("/createAdmin")` Creates an admin and adds it to the DB
`router.delete("/removeAdmin/:username")` Removes the admin with the specified username from the DB

`router.get("/viewPharmacistInfo/", viewPharmacistInfo);` Allows an admin to view the pharmacist information

`router.delete("/removePharmacist/:username", removePharmacist);` Allows an admin to remove pharmacist with a specified username from the system

`router.get("/viewPatientInfo/", viewPatientInfo);` Allows an admin to view all registered patients on the system

`router.delete("/removePatient/:username")` Allows an admin to remove a patient with the specified username from the system

`router.get("/viewPharmacistRequests", viewPharmacistRequests);` Allows admin to view all pending pharmacist applications.

`router.get('/orders' ,viewallorders)` Allows an admin to view all orders in the system

`router.get('/ordersbymonth' ,viewallordersbymonth)` Allows an admin to view orders in a specific month

`router.get("/medicines", getMedicines);` Allows an admin to view all medicines in the system

`router.get("/findMedicine", findMedicine);` Allows an admin to get a specific medicine based on the medicine name

`router.post("/acceptPharmacist", acceptPharmacist);` allows an admin to accept a pharmacist application.

`router.post("/rejectPharmacist", rejectPharmacist);` Allows an admin to reject a pharmacist application.

</details>

<details>
    <summary>
      Account Router (/account)
    </summary>

`router.post("/registerPatient")` Registers a new patinent to the platorm

`router.post("/registerDoctor")` Registers a new doctor to the platform

`router.post("/login")` Allows for the login functionality

`router.get("/logout")` allows for the logout functionality

`router.post("/forgotPassword")` `router.post("/resetPassword")`allows an account to reset their password in case they forgot it

`router.post("/verifyOTP")` Allows for OTP verification

</details>


## 3.2 | Testing:

We used Postman to test our different API endpoints.


![image](https://github.com/Skill-IssueSquad/pharmacy/assets/98961039/200f702c-d65a-4a3c-87f9-bf1271edaa2c)

| Element         | Input                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Test API:       | `http://localhost:8001/patient/cart`                                                                                     |
| Test Body JSON: | `{ "username":"omarS"}` |

### Expected reply JSON:

```bash
{
    "success": true,
    "message": "Cart returened",
    "data": {
        "medicines": [
            {
                "medicine_id": "6526d02ddc980ba82a4a62bb",
                "quantity": 2,
                "_id": "657e34c15228f58a6f07d83d"
            }
        ],
        "netPrice": 40,
        "totalPrice": 40
    }
}
```


![image](https://github.com/Skill-IssueSquad/pharmacy/assets/98961039/f16fc19d-dbd9-4447-a21f-9fcbc313c5db)


| Element         | Input                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Test API:       | `http://localhost:8001/patient/removeMedicineFromCart`                                                                                     |
| Test Body JSON: | `{"userName":"omarS","medicineId":"6526d02ddc980ba82a4a62bb"}` |

### Expected reply JSON:

```bash
{
    "success": true,
    "message": "Medicine removed",
    "data": {
        "medicines": [],
        "netPrice": 40,
        "totalPrice": 40
    }
}
```


![image](https://github.com/Skill-IssueSquad/pharmacy/assets/98961039/f14c73df-18ea-4b19-9a51-f84ad4f78281)



| Element         | Input                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Test API:       | `http://localhost:8001/patient/getPatient`                                                                                     |
| Test Body JSON: | `{ "username":"omarS" }` |

### Expected reply JSON:

```bash
{
    "success": true,
    "message": "Patient returened",
    "data": {
        "emergencyContact": {
            "fullName": "khaled",
            "mobileNumber": "012321321321",
            "relationToPatient": "son"
        },
        "cart": {
            "medicines": [],
            "netPrice": 40,
            "totalPrice": 40
        },
        "_id": "657dcc49774ada6dbb291d57",
        "username": "omarS",
        "name": "omar shaaban",
        "email": "omarS@gmail.com",
        "password": "$2b$10$kh6VAn5iOKgLlg.nVCAPAOagTUqg7TYYRq0BHtujFHxPzNT3qyQO2",
        "dateOfBirth": "2023-11-28T00:00:00.000Z",
        "gender": "M",
        "mobileNumber": "01232322323",
        "deliveryAddresses": [
            {
                "streetName": "nour",
                "propertyNum": 12,
                "floorNum": 15,
                "apartNum": 15,
                "extraLandMarks": "LandM",
                "_id": "657dcf48774ada6dbb291e86"
            }
        ],
        "orders": [
            {
                "cart": {
                    "medicines": [
                        {
                            "medicine_id": "6526d02ddc980ba82a4a62bb",
                            "quantity": 2,
                            "_id": "657dd05f673a216be3b3b31d"
                        }
                    ]
                },
                "deliveryAddress": {
                    "streetName": "nour",
                    "propertyNum": 12,
                    "floorNum": 15,
                    "apartNum": 15,
                    "extraLandMarks": "LandM"
                },
                "status": "cancelled",
                "date": "2023-12-16T16:29:24.151Z",
                "paymentMethod": "wallet",
                "discount": 0,
                "netPrice": 40,
                "_id": "657dd064673a216be3b3b372"
            },
            {
                "cart": {
                    "medicines": [
                        {
                            "medicine_id": "6526d02ddc980ba82a4a62bb",
                            "quantity": 3,
                            "_id": "657ddf4ef9b20f3d2a13e7f4"
                        }
                    ]
                },
                "deliveryAddress": {
                    "streetName": "nour",
                    "propertyNum": 12,
                    "floorNum": 15,
                    "apartNum": 15,
                    "extraLandMarks": "LandM"
                },
                "status": "cancelled",
                "date": "2023-12-16T17:48:32.453Z",
                "paymentMethod": "cash",
                "discount": 0,
                "netPrice": 60,
                "_id": "657de2f0f9b20f3d2a13ea59"
            },
            {
                "cart": {
                    "medicines": [
                        {
                            "medicine_id": "6526d02ddc980ba82a4a62bb",
                            "quantity": 2,
                            "_id": "657df1034788ad4e11ef76ac"
                        }
                    ]
                },
                "deliveryAddress": {
                    "streetName": "nour",
                    "propertyNum": 12,
                    "floorNum": 15,
                    "apartNum": 15,
                    "extraLandMarks": "LandM"
                },
                "status": "cancelled",
                "date": "2023-12-16T18:48:41.179Z",
                "paymentMethod": "cash",
                "discount": 0,
                "netPrice": 40,
                "_id": "657df1094788ad4e11ef7755"
            },
            {
                "cart": {
                    "medicines": [
                        {
                            "quantity": 2,
                            "_id": "657e2ed517813e9969dfaf75"
                        },
                        {
                            "quantity": 1,
                            "_id": "657e2ed517813e9969dfaf76"
                        }
                    ]
                },
                "deliveryAddress": {
                    "streetName": "Main Street",
                    "propertyNum": 10,
                    "floorNum": 3,
                    "apartNum": 2,
                    "extraLandMarks": "Near the post office"
                },
                "status": "pending",
                "date": "2023-12-16T00:00:00.000Z",
                "paymentMethod": "card",
                "discount": 10,
                "netPrice": 50,
                "_id": "657e2ed517813e9969dfaf74"
            },
            {
                "cart": {
                    "medicines": [
                        {
                            "quantity": 2,
                            "_id": "657e2f2517813e9969dfaf85"
                        },
                        {
                            "quantity": 1,
                            "_id": "657e2f2517813e9969dfaf86"
                        }
                    ]
                },
                "deliveryAddress": {
                    "streetName": "Main Street",
                    "propertyNum": 10,
                    "floorNum": 3,
                    "apartNum": 2,
                    "extraLandMarks": "Near the post office"
                },
                "status": "pending",
                "date": "2023-12-16T00:00:00.000Z",
                "paymentMethod": "card",
                "discount": 10,
                "netPrice": 50,
                "_id": "657e2f2517813e9969dfaf84"
            }
        ],
        "__v": 19,
        "walletBalance": 200
    }
}
```


![image](https://github.com/Skill-IssueSquad/pharmacy/assets/98961039/062565b0-2e59-4d02-b896-cf5581547d16)


| Element         | Input                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Test API:       | `http://localhost:8001/patient/clearCart`                                                                                     |
| Test Body JSON: | `{"username":"omarS"}` |

### Expected reply JSON:

```bash
{
    "success": true,
    "message": "Cart Cleared",
    "data": {}
}
```
## 3.3 | Contribution:

Contributions are always welcome!

Please adhere to this project's code of conduct.

### Getting Started

1. Fork the repository
2. Clone the repository
3. Install dependencies
4. Create a new branch
5. Make your changes
6. Commit and push your changes
7. Create a pull request
8. Wait for your pull request to be reviewed and merged

### Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). Please read the [full text](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) so that you can understand what actions will and will not be tolerated.




# Section 4: Credits and Licensing

## Credits:

> ⚠️: **Note:** Click to expand.

<details>
    <summary> Documentations: </summary>
    
- [Clean code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [RESTful Web API Patterns and Practices Cookbook](https://learning.oreilly.com/library/view/restful-web-api/9781098106737/)
- [Designing Data Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)
- [Mongoose docs](https://mongoosejs.com/docs/)
- [Express docs](https://expressjs.com/en/4x/api.html)
- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [NodeJs docs](https://nodejs.org/en/docs/)
  
</details>

<details>
    <summary> Youtube Videos and Playlists: </summary>

- [REST API (YouTube)](https://www.youtube.com/watch?v=fgTGADljAeg&list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY&index=5)
- [MERN Stack Playlist (YouTube)](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)
- [React Playlist (YouTube)](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)
- [MERN Authentication Playlist (YouTube)](https://youtube.com/playlist?list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&si=GWBphc_N4Z70ez9Y)

</details>

## License:
<details>
    <Summary> MIT License </Summary>

_Copyright (c) 2023 Skill-IssueSquad_

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

</details>


<details>
    <Summary> Apache 2.0 License </Summary>

[License details](https://www.apache.org/licenses/LICENSE-2.0)

</details>
