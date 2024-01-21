using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElmahBusiness.Dtos
{
  public class ElmahErrorDto
  {
    public string Host { get; set; }
    public string Type { get; set; }
    public string Message { get; set; }
    public string User { get; set; }
    public int StatusCode { get; set; }
    public DateTime TimeUtc { get; set; }
    public string AllXml { get; set; }
  }
}
