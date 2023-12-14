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
