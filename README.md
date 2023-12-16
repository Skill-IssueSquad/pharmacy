# El7a2ni Clinic: A virtual online clinic

El7a2ni clinic is a virtual online clinic platform that enables patients and doctors to communicate and streamline the usually tedious process of booking visits and recieving prescriptions in the usual ohysical setting of traditional clinics.

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

---

# Section 2: Features

## 2.1 | Main features:

## 2.2 | Complementary features:

## 2.3 | Code examples and screenshots:

---

# Section 3: How to use

## 3.1 | API's:

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
Features .
1. Pharmacist upload and submit required documents upon registration such as ID, pharmacy degree anf Working licenses
2. Patient/Pharmacist/Administrator can view a list of all available medicines with all the relevant details
3. Patient/Pharmacist/Administrator can search for a medicine based on name or medical usage.
4. Pharmacist can add or edit a medicine with all its relevant details.
5. Pharmacist/Administrator can view a sales report based on a chosen month and can further filter it based on medicine/date.
6. Patient can add medicines to his/her cart if he is eligible to take it.
7. Patient can view the medicines in the cart.
8. Patient can remove or change the quantity of an item in the cart.
9. Patient can checkout his/her order.
10. Patient can add a new delivery address or choose from his previous delivery addresses.
11. Patient/Pharmacist can view his/her wallet balance.
12. Patient can pay for his order using his/her wallet balance/ credit card/ Cash on delivery.
13. Patient can view his/her order details and its status.
14. Patient can cancel his/her order.
16. Patient can view alternative medicines for the medicines currently out of stock.
17. Patient can chat with a Doctor/Pharmacist in the clinic.
18. Pharmacist recevice a notification when a medicine is out of stock via email.

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
