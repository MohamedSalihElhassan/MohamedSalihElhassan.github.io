// HomeController.cs

using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Resume.Models;
using System.Diagnostics;

namespace Resume.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Courses()
        {
            var jsonPath = Path.Combine(_webHostEnvironment.WebRootPath, "courses.json");

            var coursesJson = System.IO.File.ReadAllText(jsonPath);
            var courses = JsonSerializer.Deserialize<List<Course>>(coursesJson);

            return View(courses);
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Resume()
        {
            return View();
        }

        public IActionResult Projects()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
