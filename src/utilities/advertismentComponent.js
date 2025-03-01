// import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
// import { faPhone } from "@fortawesome/free-solid-svg-icons"; // Import the phone icon

// const AdvertisementComponent = ({ type }) => {
//   const [oddAdd, setOddAdd] = useState([]);
//   const [evenAdd, setEvenAdd] = useState([]);
//   const [randomAdd, setRandomAdd] = useState([]);

//   useEffect(() => {
//     fetch("https://api.sattakingvip.co.in/advertisementUpdate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({}),
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         // console.log('advertisement json', json);
//         const odd = [];
//         const even = [];
//         const random = [];

//         // Divide data into three arrays
//         json.forEach((item, index) => {
//           if (index % 3 === 0) {
//             odd.push(item); // Every 3rd item goes into odd
//           } else if (index % 3 === 1) {
//             even.push(item); // Every 3rd + 1 item goes into even
//           } else {
//             random.push(item); // Every 3rd + 2 item goes into random
//           }
//         });

//         // Update the state with the categorized data
//         setOddAdd(odd);
//         setEvenAdd(even);
//         setRandomAdd(random);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   // generate whatsapp massanger
//   const generateWhatsAppLink = (mobile, name) => {
//     const message = `Hello ${name}, I am interested in your advertisement.`;
//     return `https://api.whatsapp.com/send?phone=${mobile}&text=${encodeURIComponent(
//       message
//     )}`;
//   };

//   // generate call dialer
//   const generateCallLink = (mobile) => {
//     return `tel:${mobile}`; // The 'tel:' protocol will open the phone dialer with the provided number
//   };

//   return (
//     <div className="advertisementSection">
     

//       {type === "even" && (
//         <div className="row">
//           {evenAdd && evenAdd.length > 0 ? (
//             evenAdd.map((even, index) => (
//               <div key={index} className="col-am-12 ad-section">
//                 <div className="col-lg-12">
//                   <h3>name: {even?.name}</h3>
//                   {/* <h6>Des: {even.description}</h6> */}
//                   <h6
//                     className="desc"
//                     dangerouslySetInnerHTML={{
//                       __html: even?.description,
//                     }}
//                   />
//                   <h4>Mobile: {even.mobile}</h4>
//                   <h4>post: {even.post}</h4>
//                   <div className="col-12">
//                     <div className="row">
//                       <div className="col-md-6 col-sm-12">
//                         {/* WhatsApp Button */}
//                         <a
//                           href={generateWhatsAppLink(even.mobile, even.name)}
//                           target="_blank"
//                           // rel="noopener noreferrer"
//                           className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
//                         >
//                           <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Now
//                         </a>
//                       </div>
//                       <div className="col-md-6 col-sm-12">
//                         {/* Call Button */}
//                         <a
//                           href={generateCallLink(even.mobile)}
//                           className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
//                         >
//                           <FontAwesomeIcon icon={faPhone} /> Call Now
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       )}


// {type === "odd" && (
//         <div className="row">
//           {oddAdd && oddAdd.length > 0 ? (
//             oddAdd.map((odd, index) => (
//               <div key={index} className="col-md-12 ad-section">
//                 <div className="col-lg-12">
//                   <h3>name: {odd?.name}</h3>
//                   {/* <h6>Des: {odd?.description}</h6> */}
//                   <h6
//                     className="desc"
//                     dangerouslySetInnerHTML={{
//                       __html: odd?.description,
//                     }}
//                   />
//                   {/* <h6>Des: {odd?.description}</h6> */}
//                   <h4>Mobile: {odd?.mobile}</h4>
//                   <h4>post: {odd?.post}</h4>
//                   <div className="col-12">
//                     <div className="row">
//                       <div className="col-md-6 col-sm-12">
//                         {/* WhatsApp Button */}
//                         <a
//                           href={generateWhatsAppLink(odd.mobile, odd.name)}
//                           target="_blank"
//                           // rel="noopener noreferrer"
//                           className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
//                         >
//                           <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Now
//                         </a>
//                       </div>
//                       <div className="col-md-6 col-sm-12">
//                         {/* Call Button */}
//                         <a
//                           href={generateCallLink(odd.mobile)}
//                           className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
//                         >
//                           <FontAwesomeIcon icon={faPhone} /> Call Now
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       )}

//       {type === "random" && (
//         <div className="row">
//           {randomAdd && randomAdd.length > 0 ? (
//             randomAdd.map((random, index) => (
//               <div key={index} className="col-am-12 ad-section">
//                 <div className="col-lg-12">
//                   <h3>name: {random?.name}</h3>
//                   {/* <h6>Des: {random.description}</h6> */}
//                   <h6
//                     className="desc"
//                     dangerouslySetInnerHTML={{
//                       __html: random?.description,
//                     }}
//                   />
//                   <h4>Mobile: {random.mobile}</h4>
//                   <h4>post: {random.post}</h4>
//                   <div className="col-12">
//                     <div className="row">
//                       <div className="col-md-6 col-sm-12">
//                         {/* WhatsApp Button */}
//                         <a
//                           href={generateWhatsAppLink(
//                             random.mobile,
//                             random.name
//                           )}
//                           target="_blank"
//                           // rel="noopener noreferrer"
//                           className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
//                         >
//                           <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Now
//                         </a>
//                       </div>
//                       <div className="col-md-6 col-sm-12">
//                         {/* Call Button */}
//                         <a
//                           href={generateCallLink(random.mobile)}
//                           className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
//                         >
//                           <FontAwesomeIcon icon={faPhone} /> Call Now
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdvertisementComponent;





import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons"; // Import the phone icon

const AdvertisementComponent = ({ type }) => {
  const [oddAdd, setOddAdd] = useState([]);
  const [evenAdd, setEvenAdd] = useState([]);
  const [randomAdd, setRandomAdd] = useState([]);

  useEffect(() => {
    fetch("https://api.sattakingvip.co.in/advertisementUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((json) => {
        const odd = [];
        const even = [];
        const random = [];

        // Divide data into three arrays
        json.forEach((item, index) => {
          if (index % 3 === 0) {
            odd.push(item); // Every 3rd item goes into odd
          } else if (index % 3 === 1) {
            even.push(item); // Every 3rd + 1 item goes into even
          } else {
            random.push(item); // Every 3rd + 2 item goes into random
          }
        });

        // Update the state with the categorized data
        setOddAdd(odd);
        setEvenAdd(even);
        setRandomAdd(random);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // generate whatsapp massanger
  const generateWhatsAppLink = (mobile, name) => {
    const message = `Hello ${name}, I am interested in your advertisement.`;
    return `https://api.whatsapp.com/send?phone=${mobile}&text=${encodeURIComponent(
      message
    )}`;
  };

  // generate call dialer
  const generateCallLink = (mobile) => {
    return `tel:${mobile}`; // The 'tel:' protocol will open the phone dialer with the provided number
  };

  return (
    <div className="advertisementSection">
      {type === "even" && (
        <div className="row">
          {evenAdd && evenAdd.length > 0 ? (
            evenAdd.slice(0, 1).map((even, index) => (
              <div key={index} className="col-am-12 ad-section">
                <div className="col-lg-12">
                  <h3>name: {even?.name}</h3>
                  <h6
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: even?.description,
                    }}
                  />
                  <h4>Mobile: {even.mobile}</h4>
                  <h4>post: {even.post}</h4>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        {/* WhatsApp Button */}
                        <a
                          href={generateWhatsAppLink(even.mobile, even.name)}
                          target="_blank"
                          className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
                        >
                          <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Now
                        </a>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        {/* Call Button */}
                        <a
                          href={generateCallLink(even.mobile)}
                          className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
                        >
                          <FontAwesomeIcon icon={faPhone} /> Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}

      {type === "odd" && (
        <div className="row">
          {oddAdd && oddAdd.length > 0 ? (
            oddAdd.slice(1, 2).map((odd, index) => (
              <div key={index} className="col-md-12 ad-section">
                <div className="col-lg-12">
                  <h3>name: {odd?.name}</h3>
                  <h6
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: odd?.description,
                    }}
                  />
                  <h4>Mobile: {odd?.mobile}</h4>
                  <h4>post: {odd?.post}</h4>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        {/* WhatsApp Button */}
                        <a
                          href={generateWhatsAppLink(odd.mobile, odd.name)}
                          target="_blank"
                          className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
                        >
                          <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Now
                        </a>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        {/* Call Button */}
                        <a
                          href={generateCallLink(odd.mobile)}
                          className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
                        >
                          <FontAwesomeIcon icon={faPhone} /> Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}

      {type === "random" && (
        <div className="row">
          {randomAdd && randomAdd.length > 0 ? (
            randomAdd.slice(2, 3).map((random, index) => (
              <div key={index} className="col-am-12 ad-section">
                <div className="col-lg-12">
                  <h3>name: {random?.name}</h3>
                  <h6
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: random?.description,
                    }}
                  />
                  <h4>Mobile: {random.mobile}</h4>
                  <h4>post: {random.post}</h4>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        {/* WhatsApp Button */}
                        <a
                          href={generateWhatsAppLink(random.mobile, random.name)}
                          target="_blank"
                          className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
                        >
                          <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Now
                        </a>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        {/* Call Button */}
                        <a
                          href={generateCallLink(random.mobile)}
                          className="form-control m-2 btn ad-btn col-md-6 col-sm-12"
                        >
                          <FontAwesomeIcon icon={faPhone} /> Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvertisementComponent;