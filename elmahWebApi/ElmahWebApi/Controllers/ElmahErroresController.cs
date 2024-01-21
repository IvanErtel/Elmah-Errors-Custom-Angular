using ElmahBusiness.Services;
using ElmahBusiness.Services.Interfaces;
using ElmahDataAccess.DataContext;
using ElmahDataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElmahWebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ElmahErroresController : ControllerBase
  {
    private readonly IElmahErrorService _service;
    public ElmahErroresController(IElmahErrorService service)
    {
      _service = service;
    }
    [HttpPost]
    public IActionResult GetErrors([FromBody] PaginationFilter paginationFilter)
    {            
      var elmahErrorList = _service.GetAllPaginated(paginationFilter);
      return Ok(elmahErrorList);
    }
  }
}
