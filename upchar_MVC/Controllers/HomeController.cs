using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace upchar_MVC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Appointment()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        [HttpPost]
        public ActionResult Appointment(string username, string Email, string area_of_pain, string phn, string date, string message)
        {
            SendMail(username, Email, phn, message, "Appointment","", area_of_pain, date);

            return View();
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [HttpPost]
        public ActionResult Contact(string username, string Email, string phn,string subject, string message)
        {
            SendMail(username, Email, phn, message, "Contact", subject);
            
            return View();
        }
        public bool SendMail(string Name, string Email, string Phone, string Message, string Type, string subject = "", string area_of_pain="",string date="")
        {

            MailMessage message = new MailMessage();
            message.To.Add(WebConfigurationManager.AppSettings["FromEmailID"]);
            message.From = new MailAddress(WebConfigurationManager.AppSettings["FromEmailID"]);
           

            string body = "";
            if (Type == "Appointment")
            {
                message.Subject = "Appointment Mail";
                body = "<p>Person Name : " + Name + "</p>";
                body = body + "<p>Email ID : " + Email + "</p>";
                body = body + "<p>Phone No : " + Phone + "</p>";
                body = body + "<p>Area of pain : " + area_of_pain + "</p>";
                body = body + "<p>Date : " + date + "</p>";
                body = body + "<p>Message : " + Message + "</p>";
            }
            else
            {
                message.Subject = "Contact Mail";
                body = "<p>Person Name : " + Name + "</p>";
                body = body + "<p>Email ID : " + Email + "</p>";
                body = body + "<p>Phone No : " + Phone + "</p>";
                body = body + "<p>Subject : " + subject + "</p>";
                body = body + "<p>Message : " + Message + "</p>";
            }
           
            message.Body = body;
            message.IsBodyHtml = true;
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.Port = 587;
            smtpClient.Credentials = new NetworkCredential(WebConfigurationManager.AppSettings["FromEmailID"], WebConfigurationManager.AppSettings["FromEmailPassword"]);
            smtpClient.EnableSsl = true;
            smtpClient.Send(message);
            return true;

        }
    }
}