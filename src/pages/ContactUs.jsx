/** @format */

import React from "react";
import { useMutation } from "@tanstack/react-query";

function ContactUs() {
    const contactUsMutation = useMutation({
        mutationFn: async (formData) => {
            const response = await fetch(
                "http://api.gadidikhao.com/api/enquiry/contactUs",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        onSuccess: () => {
            alert("Message sent successfully!");
            // You could reset the form here if needed
        },
        onError: (error) => {
            alert("Error sending message: " + error.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.tel.value,
            message: e.target.message.value,
        };
        contactUsMutation.mutate(formData);
    };

    return (
        <>
            <section className="contact-us">
                <div className="banner-area">
                    <div className="container">
                        <div className="banner-text">
                            <h2>Send a signal and we'll catch it!</h2>
                        </div>
                    </div>
                </div>

                {/* <div>
          <div className="contact-card">
            <div className="contact-map mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3508.279203528234!2d77.03689561166678!3d28.440998692650606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCARS24%20Private%20Limited%20Tower%20C%2C%207th%20Floor%2C%20SAS%20Towers%2C%20Medanta%20the%20Medicity%2C%20Sector%2038%2C%20Gurugram%2C%20Haryana%20122001!5e0!3m2!1sen!2sin!4v1728027650472!5m2!1sen!2sin"
                width="100%"
                height={259}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="contact-info">
              <div className="office-details">
                <h3>Corporate office address</h3>
                <p className="mb-0">
                  Cars24 Services Private Limited, Tower C, 7th Floor, SAS
                  Towers, Medanta the Medicity, Sector 38, Gurugram, Haryana
                  122001
                </p>
              </div>
              <div className="email-wrapper">
                <div className="email-section">
                  <h3>Customer support</h3>
                  <a href="mailto:care@cars24.com">care@cars24.com</a>
                </div>
                <div className="email-section">
                  <h3>Media queries</h3>
                  <a href="mailto:press@cars24.com">press@cars24.com</a>
                </div>
                <div className="email-section">
                  <h3>Whistleblower</h3>
                  <a href="mailto:whistle@cars24.com">whistle@cars24.com</a>
                </div>
              </div>
              <div className="divider">
                <span>OR</span>
              </div>
              <button className="whatsapp-btn">
                <img
                  src="https://assets.cars24.com/production/consumer-web-in/250626234733/d/_next/static/media/whatsapp_icon.e612ec0b.svg"
                  alt="whatsapp"
                  width={22}
                  height={22}
                />
                <p>Chat on Whatsapp</p>
              </button>
            </div>
          </div>
        </div> */}
            </section>
            <section className="tf-section-contact">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 contact-left">
                            <div className="heading-section mb-30">
                                <h2>Drop Us a Line</h2>
                                <p className="mt-12">
                                    Feel free to connect with us through our
                                    online channels for updates, news, and more.
                                </p>
                            </div>
                            <div id="comments" className="comments">
                                <div className="respond-comment">
                                    <form
                                        method="post"
                                        id="loan-calculator"
                                        className="comment-form form-submit"
                                        onSubmit={handleSubmit}
                                        acceptCharset="utf-8"
                                        noValidate="novalidate"
                                    >
                                        <div className="grid-sw-2">
                                            <fieldset className="email-wrap style-text">
                                                <label className="font-1 fs-14 fw-5">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="tb-my-input"
                                                    name="name"
                                                    placeholder="Your name"
                                                    required=""
                                                />
                                            </fieldset>
                                            <fieldset className="phone-wrap style-text">
                                                <label className="font-1 fs-14 fw-5">
                                                    Email address
                                                </label>
                                                <input
                                                    type="email"
                                                    className="tb-my-input"
                                                    name="email"
                                                    placeholder="Your email"
                                                    required=""
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="grid-sw-2">
                                            <fieldset className="email-wrap style-text">
                                                <label className="font-1 fs-14 fw-5">
                                                    Phone Numbers
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="tb-my-input"
                                                    name="tel"
                                                    placeholder="Phone Numbers"
                                                    required=""
                                                />
                                            </fieldset>
                                            <fieldset className="phone-wrap style-text">
                                                <label className="font-1 fs-14 fw-5">
                                                    Subject
                                                </label>
                                                <input
                                                    type="text"
                                                    className="tb-my-input"
                                                    name="subject"
                                                    placeholder="Enter Keyword"
                                                    required=""
                                                />
                                            </fieldset>
                                        </div>
                                        <fieldset className="phone-wrap style-text">
                                            <label className="font-1 fs-14 fw-5">
                                                Your Message
                                            </label>
                                            <textarea
                                                id="comment-message"
                                                name="message"
                                                rows={4}
                                                tabIndex={4}
                                                placeholder="Your message"
                                                aria-required="true"
                                                defaultValue={""}
                                            />
                                        </fieldset>
                                        <div className="button-boxs">
                                            <button
                                                className="sc-button"
                                                name="submit"
                                                type="submit"
                                                disabled={
                                                    contactUsMutation.isPending
                                                }
                                            >
                                                <span>
                                                    {contactUsMutation.isPending
                                                        ? "Sending..."
                                                        : "Send Message"}
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 contact-right">
                            <div className="contact-info box-sd">
                                <h2 className="mb-30">Contact Us</h2>
                                <div className="wrap-info">
                                    <div className="box-info">
                                        <h5>Address</h5>
                                        <p>
                                            101 E 129th St, East Chicago, IN
                                            46312 <br /> United States
                                        </p>
                                    </div>
                                    <div className="box-info">
                                        <h5>Infomation:</h5>
                                        <p>1-333-345-6868</p>
                                        <p>themesflat@gmail.com</p>
                                    </div>
                                    <div className="box-info">
                                        <h5>Opentime:</h5>
                                        <p>Monay - Friday: 08:00 - 20:00</p>
                                        <p>Saturday - Sunday: 10:00 - 18:00</p>
                                    </div>
                                    <div className="box-info">
                                        <h5>Follow Us:</h5>
                                        <div className="icon-social style2">
                                            <a href="#">
                                                <i className="icon-autodeal-facebook" />
                                            </a>
                                            <a href="#">
                                                <i className="icon-autodeal-linkedin" />
                                            </a>
                                            <a href="#">
                                                <i className="icon-autodeal-twitter" />
                                            </a>
                                            <a href="#">
                                                <i className="icon-autodeal-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="tf-section-map">
                <div className="container-fluid">
                    <div className="map">
                        <iframe
                            className="map-content"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7302.453092836291!2d90.47477022812872!3d23.77494577893369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1627293157601!5m2!1svi!2s"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactUs;
