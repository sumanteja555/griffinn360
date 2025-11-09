// local style imports
import { useState, useEffect } from "react";
import styles from "./BookNow.module.css";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import Input from "./Input";

import logo from "../../assets/logo.webp";
import { useNavigate } from "react-router-dom";

import { snackbarActions } from "../../store/store";

export default function BookNow() {
  const eventName = useSelector((state) => state.cart.eventName);
  const price = useSelector((state) => state.cart.price);
  const userNumber = useSelector((state) => state.user.number);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // backend url
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [amount, setAmount] = useState(price);
  const [minDate, setMinDate] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay SDK
  useEffect(() => {
    if (window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      // console.log("Razorpay SDK loaded successfully");
      setRazorpayLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      dispatch(
        snackbarActions.openBar({
          type: "warning",
          message:
            "Payment system failed to initialize. Please refresh the page.",
        })
      );
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [dispatch]);

  // min date for booking
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate()); // Set to tomorrow's date
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  // changing the amount based on the number of persons
  function handleOnChange(event) {
    setAmount(event.target.value * price);
  }

  // function for creating the order
  async function createOrder(amount) {
    if (!backendURL) {
      console.error("backendURL is not defined");
      dispatch(
        snackbarActions.openBar({
          type: "warning",
          message: "Server configuration error. Contact admin.",
        })
      );
      return null;
    }

    try {
      const response = await fetch(`${backendURL}/payment.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("createOrder failed", response.status, text);
        dispatch(
          snackbarActions.openBar({
            type: "warning",
            message: "Payment initialization failed. Please try again.",
          })
        );
        return null;
      }

      const data = await response.json();
      // console.log("Payment initialization response:", data);

      if (!data.razorpay_key_id) {
        console.error("Missing Razorpay key in response", data);
        dispatch(
          snackbarActions.openBar({
            type: "warning",
            message: "Payment configuration error. Please contact support.",
          })
        );
        return null;
      }

      return data;
    } catch (error) {
      console.error("createOrder error", error);
      dispatch(
        snackbarActions.openBar({
          type: "warning",
          message: "Payment failed. Please try again",
        })
      );
      return null;
    }
  }

  // function for adjusting the Razorpay modal
  function adjustRazorpayModal() {
    const modal = document.querySelector(".razorpay-container");
    if (modal) {
      let styles = {
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxHeight: "90vh",
        width: "100%",
        maxWidth: "100%",
        overflowY: "auto",
        zIndex: "9999",
      };

      const screenWidth = window.innerWidth;

      if (screenWidth >= 768 && screenWidth < 1024) {
        styles.maxWidth = "600px";
        styles.top = "25%";
      } else if (screenWidth < 768) {
        styles.maxWidth = "100%";
        styles.height = "100vh";
        styles.top = "3%";
        styles.left = "0";
        styles.transform = "none";
        styles.borderRadius = "0";
      }

      Object.assign(modal.style, styles);
    }
  }

  const hanldeBooking = async (bookingData) => {
    try {
      const response = await fetch(`${backendURL}/bookings.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(
          "bookings.php returned non-OK response",
          response.status,
          text
        );
        dispatch(
          snackbarActions.openBar({
            type: "warning",
            message: "Unable to save booking (server error).",
          })
        );
        return null;
      }

      try {
        const data = await response.json();
        return data;
      } catch (parseErr) {
        const text = await response.text();
        console.error("bookings.php returned invalid JSON:", text);
        dispatch(
          snackbarActions.openBar({
            type: "warning",
            message: "Unable to save booking (invalid server response).",
          })
        );
        return null;
      }
    } catch (error) {
      dispatch(
        snackbarActions.openBar({
          type: "warning",
          message:
            "Unable to update booking details. Please contact Administrator",
        })
      );
    }
  };
  // handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());

    try {
      // creating order
      const order = await createOrder(formData.amount);

      if (!order) {
        // createOrder already dispatched an error snackbar
        return;
      }

      if (!order.orderId && !order.order_id) {
        console.error("Invalid order returned", order);
        dispatch(
          snackbarActions.openBar({
            type: "warning",
            message: "Payment initialization failed. Please try again.",
          })
        );
        return;
      }

      // Check if Razorpay is loaded
      if (!razorpayLoaded || !window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        dispatch(
          snackbarActions.openBar({
            type: "warning",
            message:
              "Payment system is initializing. Please try again in a few seconds.",
          })
        );
        return;
      }

      const options = {
        key: order.razorpay_key_id || order.key,
        amount: order.amount,
        currency: order.currency,
        name: "Griff Inn 360 Adventures",
        image: logo,
        description: formData.tripName,
        order_id: order.orderId || order.order_id,
        handler: async function (response) {
          // verifying order
          try {
            const result = await fetch(`${backendURL}/verify.php`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });
            if (!result.ok) {
              const text = await result.text();
              console.error(
                "verify.php returned non-OK response",
                result.status,
                text
              );
              dispatch(
                snackbarActions.openBar({
                  type: "warning",
                  message: "Payment verification failed (server error).",
                })
              );
              return;
            }

            let data;
            try {
              data = await result.json();
            } catch (parseErr) {
              const text = await result.text();
              console.error("verify.php returned invalid JSON:", text);
              dispatch(
                snackbarActions.openBar({
                  type: "warning",
                  message:
                    "Payment verification failed (invalid server response).",
                })
              );
              return;
            }

            const bookingData = {
              name: formData.name,
              mobileNumber: userNumber,
              email: formData.email,
              persons: formData.persons,
              travelDate: formData.date,
              eventName: formData.tripName,
              amount: formData.amount,
              paymentId:
                data.paymentId || data.payment_id || data.payemntId || null,
              orderId: data.orderId || data.order_id || null,
            };

            if (data.status === "success") {
              await hanldeBooking(bookingData);
              dispatch(
                snackbarActions.openBar({
                  type: "success",
                  message: "Payment Successful",
                })
              );
              navigate("/");
            } else {
              // alert("Payment verification failed.");
              dispatch(
                snackbarActions.openBar({
                  type: "warning",
                  message: "Payment failed. Please try again",
                })
              );
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            dispatch(
              snackbarActions.openBar({
                type: "warning",
                message: "Payment failed. Please try again",
              })
            );
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: userNumber,
        },
        theme: {
          color: "#3399cc",
        },
      };

      window.scrollTo({ top: 0, behavior: "smooth" });

      // console.log("Opening Razorpay with options:", options);
      const rzp = new window.Razorpay(options);
      rzp.open();
      setTimeout(() => adjustRazorpayModal(), 500);

      window.addEventListener("resize", adjustRazorpayModal);

      rzp.on("payment.success", () => {
        window.removeEventListener("resize", adjustRazorpayModal);
      });
      rzp.on("payment.failed", () => {
        window.removeEventListener("resize", adjustRazorpayModal);
      });
    } catch (error) {
      // alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section className={styles.container}>
      <p className={styles.heading}>Book Now</p>
      <p>3% of the total amount will be added as tax at checkout</p>
      <form className={styles.form} onSubmit={handleSubmit} method="POST">
        {/* name input */}
        <Input
          type="text"
          id="name"
          placeholder="Enter your full name"
          labelText="Enter your full name:"
        />
        {/* input email id container */}
        <Input
          type="email"
          id="email"
          placeholder="Enter your email id"
          labelText="Enter your Email Id:"
        />

        {/* total number of persons container */}
        <div className={styles.inputContainer}>
          <input
            type="number"
            id="persons"
            name="persons"
            inputMode="numeric"
            className={styles.input}
            placeholder="Total No. of persons"
            defaultValue={1}
            onChange={handleOnChange} // Fixed event handling
          />
          <label htmlFor="persons" className={styles.label}>
            Total No. of persons:
          </label>
        </div>

        {/* date selector input */}
        <div className={styles.inputContainer}>
          <label htmlFor="date">Date of travel:</label>
          <input
            type="date"
            name="date"
            id="date"
            required
            min={minDate}
            className={styles.dateInput}
          />
        </div>

        {/* trip/ trek details */}
        <div className={styles.inputContainer}>
          <label htmlFor="tripName">Selected Activity Name:</label>
          <input
            type="text"
            name="tripName"
            id="tripName"
            value={eventName}
            className={styles.tripName}
            readOnly
          />
        </div>

        {/* amount container */}
        <div className={styles.amountContainer}>
          <label htmlFor="amount" className={styles.amountLabel}>
            Amount: Rs:
          </label>
          <input
            type="text"
            name="amount"
            id="amount"
            value={amount}
            readOnly
            className={styles.amountInput}
          />
        </div>
        <div className={styles.buttonContainer}>
          <input type="submit" value="Submit" className={styles.button} />
        </div>
      </form>
    </section>
  );
}
