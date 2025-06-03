    const [reservation, setReservation] = useState({
        vehicleId: '',
        pickupLocationId: '',
        dropoffLocationId: '',
        pickupDateTime: '',
        dropoffDateTime: '',
        addons: [],
        paymentMethodId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddonsChange = (e) => {
        const { name, value } = e.target;
        setReservation((prevState) => ({
            ...prevState,
            addons: prevState.addons.map((addon) =>
                addon.name === name ? { ...addon, quantity: value } : addon
            ),
        }));
    };

    const handlePaymentMethodChange = (e) => {
        const { value } = e.target;
        setReservation((prevState) => ({
            ...prevState,
            paymentMethodId: value,
        }));
    };
