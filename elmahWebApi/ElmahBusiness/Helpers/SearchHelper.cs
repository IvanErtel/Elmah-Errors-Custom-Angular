using ElmahBusiness.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ElmahDataAccess.Models.PaginationFilter;

namespace ElmahBusiness.Helpers
{
    internal class SearchHelper : ISearchHelper
    {
        public void SearchItems<T>(ref IQueryable<T> datos, Filter[] filters)
        {
            try
            {
                if (filters != null)
                {
                    foreach (var filter in filters)
                    {
                        var property = typeof(T).GetProperty(filter.Field);

                        if (property != null)
                        {
                            var value = property.GetValue(datos.First());

                            if ((value != null && value.ToString() == filter.Value) || value == null && filter.Value == null)
                            {
                                datos = datos.Where(item => property.GetValue(item).ToString() == filter.Value);
                            }
                        }
                        
                    }
                }
            }
            catch (System.Exception exception)
            {
                throw new System.Exception(exception.Message);
            }
        }
    }
}
