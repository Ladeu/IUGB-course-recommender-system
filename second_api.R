# Load required libraries
library(plumber)
library(arules)

# Load the pre-trained model
loaded_rules <- readRDS("course_recommendation_rules.rds")

#* @filter cors
function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

#* @apiTitle Course Recommendation API
#* @param courses Comma-separated list of courses taken (spaces allowed)
#* @get /recommend
function(courses = "") {
  # Convert spaces to underscores (to match your rule format)
  formatted_courses <- gsub(" ", "_", trimws(courses))
  
  # Split into a vector and remove empty entries
  student_courses <- unlist(strsplit(formatted_courses, ","))
  student_courses <- student_courses[student_courses != ""]
  
  # Debug: Print received courses
  print(paste("Received courses:", paste(student_courses, collapse = ", ")))
  
  # Find matching rules (use %ain% for exact matching)
  matching_rules <- subset(loaded_rules, subset = lhs %ain% student_courses)
  
  # Extract recommendations and convert underscores back to spaces for display
  recommendations <- unique(as(rhs(matching_rules), "list"))
  recommendations <- lapply(recommendations, function(x) gsub("_", " ", x))
  
  # Return results
  return(list(recommendations = unlist(recommendations)))
}