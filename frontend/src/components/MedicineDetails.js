const MedicineDetails= ({Medicine}) => {
    return (
        <div className="Medicine-details">
            <h4>{Medicine.title}</h4>
            <p><strong> medicineName: </strong>{Medicine.medicineName}</p>
            <p><strong> description: </strong>{Medicine.description}</p>
            <p>{Medicine.createdAt}</p>
        </div>
    )

}

export default MedicineDetails