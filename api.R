#* @get /reccommend
#* @param IUGB_courses Comma-separated list of courses
function(courses = "") {
  courses_taken <- unlist(strsplit(courses, ","))
  courses_taken <- trimws(courses_taken)  # Remove any whitespace
  
  matching_rules <- subset(rules, lhs %in% courses_taken)
  recommendations <- unique(rhs(matching_rules))
  
  return(as(recommendations, "list"))
}