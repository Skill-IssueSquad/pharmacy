# El7a2ni Pharmacy: A virtual online Pharmacy

El7a2ni Pharmacy is a virtual online Pharmacy platform that enables patients and pharmacists to communicate and streamline the usually tedious process of buying medicines

---

# Section 1: Brief

## 1.1 | Motiviation:

This project was motivated by the very dire need for a more accessible and streamlined way of communication between doctors and patients unlike what is usually present in the real world. Most traditional clinics are usually limited by how many patients they can take in a day and how many of the staff is able to work on any given day. Most tasks have the ability to be automated and streamlined using software solutions that will subsequently increase the capacity of doctors to receive more patients and the ability of patients to communicate with more doctors effeciently; All while keeping their prescriptions and visit statuses organized and accessible any time without the need to call in and ask a staff member.

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

|||
| ----------- | ----------- |
| [React](https://reactjs.org/) | ![React](	https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)|
| [Node.js](https://nodejs.org/en/) | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) |
| [JWT](https://jwt.io/)| ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)|
| [Express](https://expressjs.com/)| ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) |
| [MongoDB](https://www.mongodb.com/)|![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)|
| [Mongoose](https://mongoosejs.com/)| ![Mongoose](https://img.shields.io/badge/Mongoose-black.svg?style=for-the-badge&logo=mongoose&logoColor=orange)|
| [Swagger](https://swagger.io/)| ![Swagger](https://img.shields.io/badge/Swagger-black.svg?style=for-the-badge&logo=swagger&logoColor=white)|
| [Material-UI](https://material-ui.com/)| ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) |
| [Stripe](https://stripe.com/)|	![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white) |
| [Typescript](https://www.typescriptlang.org/)|![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)|
| [Git](https://git-scm.com/)| ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)|
| [Github Actions](github.com/features/actions)|![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) |
| [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)| ![MongoDB](https://img.shields.io/badge/MongoDB%20Atlas-white.svg?style=for-the-badge&logo=mongodb&logoColor=green)|
| [Postman](https://www.postman.com/)|![Postman](https://img.shields.io/badge/postman-black.svg?style=for-the-badge&logo=postman&logoColor=orange)|
| [VSCode](https://code.visualstudio.com/)|![VScode](https://img.shields.io/badge/VS%20code-black.svg?style=for-the-badge&logo=visualstudiocode&logoColor=blue)|


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

## 2.2 | Complementary features:

## 2.3 | Code examples and screenshots:

---

# Section 3: How to use

## 3.1 | API's:
1. http://localhost:8001/medicine
2. http://localhost:8001/patient/getPatient
3. http://localhost:8001/account/login
4. 


## 3.2 | Testing:

We used Postman to test our different API endpoints.

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

---

# Section 4: Credits and Licensing

## Credits:

## License:























# pharmacy
Skill_IssueSquad's Pharmacy



List of available Medicines:
```
const getAllMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.find({ isArchived: false });
    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
 ```
Search for a medcine based on name or medical usage
```
const getMedicineByName = (req, res) => {
  const medicineName = req.params.name;
  if (!medicineName || medicineName === "") {
    console.log("EMPTY SEARCH");
    res.status(200).json([]);
  } else {
    Medicine.find({ medicineName: medicineName, isArchived: false })
      .then((medicine) => {
        if (medicine) {
          res.status(200).json(medicine);
        } else {
          res.status(404).json({ error: "Medicine not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });

  }
};

const getMedicineByMedicalUse = (req, res) => {
  const medicinalUsage = req.params.medical_use;

  if (!medicinalUsage || medicinalUsage === "") {
    console.log("EMPTY SEARCH");
    res.status(200).json([]);
  } else {
    Medicine.find({ medicinalUsage: medicinalUsage, isArchived: false })
      .then((medicine) => {
        if (medicine) {
          res.status(200).json(medicine);
        } else {
          res.status(404).json({ error: "Medicine not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });
  }
};




```
