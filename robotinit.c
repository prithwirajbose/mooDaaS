#include <stdio.h>
main() {
  printf("Starting Jenkins on server...");
system("robot -d result Tests/Build_Acceptance_Script/Build_Acceptance_Script.robot");
}
