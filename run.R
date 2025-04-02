# run_api.R
library(plumber)
pr <- plumb("C:/Users/DELL/Documents/IUGB/R_Programming_for_Data_Science/project/second_api.R")
pr$run(port = 8000, host = "0.0.0.0")  # Allow external connections

