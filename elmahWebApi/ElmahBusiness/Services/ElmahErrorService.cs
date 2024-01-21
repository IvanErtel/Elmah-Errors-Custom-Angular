using AutoMapper;
using ElmahBusiness.Dtos;
using ElmahBusiness.Helpers;
using ElmahBusiness.Services.Interfaces;
using ElmahDataAccess.DataContext;
using ElmahDataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Collections.Generic;
using System.Linq;

namespace ElmahBusiness.Services
{

    public class ElmahErrorService : IElmahErrorService
    {
        private SIS_ElmahContext _elmahContext;
        private ISearchHelper _searchHelper;
        private IMapper _mapper;


        public ElmahErrorService(SIS_ElmahContext context,  IMapper mapper)
        {
            _elmahContext = context;
            _mapper = mapper;
        }
        public List<ElmahError> GetAll()
        {
            var elmahErrorList = _elmahContext.ElmahErrors
                .OrderByDescending(e => e.TimeUtc)
                .Take(50)
                .ToList();

            return elmahErrorList;
        }

        public PagesResult<ElmahErrorDto> GetAllPaginated(PaginationFilter paginationFilter)
        {
            try
            {
                if (_elmahContext == null)
                {
                    _elmahContext = new SIS_ElmahContext();
                }

                IQueryable<ElmahError> _elmahErrors = _elmahContext.ElmahErrors;

                if (paginationFilter.StartDate.HasValue)
                {
                    _elmahErrors = _elmahErrors.Where(e => e.TimeUtc >= paginationFilter.StartDate.Value);
                }
                if (paginationFilter.EndDate.HasValue)
                {
                    _elmahErrors = _elmahErrors.Where(e => e.TimeUtc <= paginationFilter.EndDate.Value);
                }

                if (!string.IsNullOrEmpty(paginationFilter.TextFilter))
                {
                    _elmahErrors = _elmahErrors.Where(e => e.Message.Contains(paginationFilter.TextFilter));
                }

                if (paginationFilter.filters != null && paginationFilter.filters.Any())
                {
                    SearchHelper _searchHelper = new SearchHelper();
                    _searchHelper.SearchItems(ref _elmahErrors, paginationFilter.filters);
                }

                var totalItems = _elmahErrors.Count();

                
                List<ElmahError> elmahErrors = _elmahErrors
                    .OrderByDescending(l => l.ErrorId)
                    .Skip((paginationFilter.PageNumber - 1) * paginationFilter.PageSize)
                    .Take(paginationFilter.PageSize)
                    .ToList();

                List<ElmahErrorDto> elmahErrorsDto = _mapper.Map<List<ElmahErrorDto>>(elmahErrors);
                var pagesResult = new PagesResult<ElmahErrorDto>
                {
                    Result = elmahErrorsDto,
                    TotalItems = totalItems,
                    PageNumber = paginationFilter.PageNumber,
                    PageSize = paginationFilter.PageSize
                };

                return pagesResult;
            }
            catch (System.Exception exception)
            {
                throw new System.Exception(exception.Message);
            }
        }
    }
}
