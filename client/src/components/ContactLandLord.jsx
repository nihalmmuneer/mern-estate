import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";
export const ContactLandLord = ({ listings }) => {
  const [LandLord, setLandLord] = useState(null);
  console.log(listings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listings.userRef}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success === false) {
          return;
        }
        if (res.ok) {
          setLandLord(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchLandLord();
  }, []);
  console.log(message, "message");
  return (
    <div className="mt-5 flex flex-col gap-4">
      <p className="flex gap-1 text-sm">
        Contact <span className="font-semibold">{LandLord?.username}</span>for{" "}
        <span className="font-semibold">{listings?.name}</span>
      </p>
      <textarea
        placeholder="Write a message.."
        className="p-3 w-full rounded-lg border"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Link
        to={`mailto:${LandLord?.email}?subject=Regarding ${listings?.name}&body=${message}`}
      >
        <button
          type="button"
          className="text-white w-full flex justify-center items-center gap-2 bg-slate-700 p-3 rounded-lg hover:opacity-90 uppercase"
        >
          <IoIosSend />
          Send message
        </button>
      </Link>
    </div>
  );
};

ContactLandLord.propTypes = {
  listings: PropTypes.object.isRequired,
};
