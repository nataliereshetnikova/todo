using System;

namespace ToDoAPI.Models
{
    public class ToDoItem
    {
        public long Id{get;set;}
        public string Name{get;set;}
        public bool IsComplete{get;set;}
        public DateTime Deadline{get;set;}
        public string Description{get;set;}
    }
}