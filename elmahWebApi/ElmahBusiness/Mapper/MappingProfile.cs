using AutoMapper;
using ElmahDataAccess.Models;
using ElmahBusiness.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElmahBusiness.Mapper
{
    public class MappingProfile: Profile
    {
        public MappingProfile() 
        {
            CreateMap<ElmahError, ElmahErrorDto>();
        }
    }
}
