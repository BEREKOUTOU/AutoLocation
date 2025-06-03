    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchReservations = async () => {
        const response = await fetch(`/api/reservations?userId=${user.userId}`);
        const data = await response.json();
        setReservations(data);
        setLoading(false);
      };
      fetchReservations();
    }, [user.userId]);
