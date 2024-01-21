using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ElmahDataAccess.Models.PaginationFilter;

namespace ElmahBusiness.Services.Interfaces
{
    public interface ISearchHelper
    {
        void SearchItems<T>(ref IQueryable<T> datos, Filter[] filters);
    }
}
