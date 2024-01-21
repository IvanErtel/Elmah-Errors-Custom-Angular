using ElmahBusiness.Dtos;
using ElmahDataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElmahBusiness.Services.Interfaces
{
    public interface IElmahErrorService
    {
        List<ElmahError> GetAll();

        PagesResult<ElmahErrorDto> GetAllPaginated(PaginationFilter paginationFilter);

    }
}
