package hrms.controller.employee;

import hrms.model.dto.EmployeeDto;
import hrms.service.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @PostMapping("/register") //사원 등록 결제 정보 받아오기
    public boolean registerEmp(@RequestBody EmployeeDto employeeDto)
    {
        //System.out.println("employeeDto = " + employeeDto);
        return employeeService.registerEmp(employeeDto);
    }

    @GetMapping("/list")
    public List<EmployeeDto> getEmpList()
    {
        //System.out.println("EmployeeController.getEmpList");
        return employeeService.getEmpList();
    }
    @PutMapping("/leave")
    public boolean setEmpStatus(@RequestParam int emp_no)
    {
        //System.out.println("EmployeeController.setEmpStatus");
        return employeeService.setEmpStatus(emp_no);
    }

}
