package com.example.employeemanagementsystemreact.controller;

import com.example.employeemanagementsystemreact.entity.Employee;
import com.example.employeemanagementsystemreact.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.module.ResolutionException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//This is needed to work with React
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(
                        () ->
                                new ResolutionException("Employee not exists with id: " + id)
                );
        return ResponseEntity.ok(employee);
    }

    @PostMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee){
        Employee oldEmployee = employeeRepository.findById(id)
                .orElseThrow(
                        () ->
                                new ResolutionException("Employee not exists with id: " + id)
                );
        updatedEmployee.setId(oldEmployee.getId());
        employeeRepository.save(updatedEmployee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(
                        () ->
                                new ResolutionException("Employee not exists with id: " + id)
                );
        employeeRepository.delete(employee);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
