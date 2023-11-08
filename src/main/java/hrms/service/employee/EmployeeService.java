package hrms.service.employee;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import hrms.model.dto.ApprovalRequestDto;
import hrms.model.dto.EmployeeDto;
import hrms.model.dto.RetiredEmployeeDto;
import hrms.model.entity.ApprovalEntity;
import hrms.model.entity.DepartmentEntity;
import hrms.model.entity.EmployeeEntity;
import hrms.model.entity.RetiredEmployeeEntity;
import hrms.model.repository.ApprovalEntityRepository;
import hrms.model.repository.DepartmentEntityRepository;
import hrms.model.repository.EmployeeEntityRepository;
import hrms.model.repository.RetiredEmployeeEntityRepository;
import hrms.service.approval.ApprovalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    EmployeeEntityRepository employeeRepository;
    @Autowired
    RetiredEmployeeEntityRepository retiredEmployeeEntityRepository;
    @Autowired
    DepartmentEntityRepository departmentEntityRepository;
    @Autowired
    ApprovalEntityRepository approvalEntityRepository;
    @Autowired
    ApprovalService approvalService;
    private final int LEAVE_COUNT = 5;

    // 사원 등록
    @Transactional
    public boolean registerEmp(ApprovalRequestDto<EmployeeDto> employeeDtoApprovalRequestDto)
    {
        EmployeeDto employeeDto = employeeDtoApprovalRequestDto.getData(); // 결제정보를 포함한 dto에서 사원 데이터 추출
        System.out.println("employeeDto = " + employeeDto.toString());
        employeeDto.setEmpNo(generateEmpNumber(employeeDto.getEmpSex())); // pk생성
        //EmployeeEntity employeeEntity = employeeDto.saveToEntity(); // 사원 dto entity로 변경

        // 결제 등록 후 entity반환
        ApprovalEntity approvalEntity = approvalService.postApproval(
                employeeDtoApprovalRequestDto.getAprvType()
                , employeeDtoApprovalRequestDto.getAprvCont()
                ,employeeDtoApprovalRequestDto.getApprovers());
        System.out.println(approvalEntity.toString());
        // 입력한 부서의 fk 호출
        Optional<DepartmentEntity> optionalDepartmentEntity =  departmentEntityRepository.findById(employeeDto.getDtpmNo());
        System.out.println("optionalDepartmentEntity = " + optionalDepartmentEntity);
        // 결제 메소드 추가

        // 부서 유효성 검사 및 fk 매핑
        if(optionalDepartmentEntity.isPresent())
        {
            EmployeeEntity employeeEntity = employeeRepository.save(employeeDto.saveToEntity());
            employeeEntity.setDptmNo(optionalDepartmentEntity.get());
            optionalDepartmentEntity.get().getEmployeeEntities().add(employeeEntity);
            employeeEntity.getApprovalEntities().add(approvalEntity);

            System.out.println("optionalDepartmentEntity = " + optionalDepartmentEntity.get().getEmployeeEntities());
            System.out.println("employeeEntity.getApprovalEntities() = " + employeeEntity.getApprovalEntities());

            return !employeeEntity.getEmpNo().isEmpty();

        }
        return false;
    }
    // 사원 pk 생성
    @Transactional
    public String generateEmpNumber(String _sex)
    {
        // 사원 pk 생성 현재 날짜를 기준으로    YY-MM-성별-해당 현재 연도에 입사한 사원수
        LocalDate now = LocalDate.now();
        String _str = String.valueOf(now.getYear()).substring(2); //년
        _str += String.valueOf(now.getMonthValue());   //월
        _str += _sex.equals("남자") ? "1" : "2"; // 성별
        _str += String.valueOf(employeeRepository.countNowEmployee(String.valueOf(now.getYear()))) ;
        System.out.println("_str = " + _str);
        return _str;
    }

    //사원 조회 ( 페이징 처리 예정)
    @Transactional
    public List<EmployeeDto> getEmpList()
    {
        List<EmployeeDto> result = new ArrayList<>();
        return result;
    }
    //사원 개별 조회
    @Transactional
    public EmployeeDto getOneEmp(String empNo)
    {
        Optional<EmployeeEntity> optionalEmployeeEntity = employeeRepository.findByEmpNo(empNo);
        if(optionalEmployeeEntity.isPresent())
        {
            return optionalEmployeeEntity.get().allToDto();
        }
        return null;
    }
    
    @Transactional
    public List<EmployeeDto> getAprvList()
    {
        //List<EmployeeEntity> result = employeeRepository.findByDptmNoAndEmpRkGreaterThan(1,0);
        List<EmployeeEntity> result = employeeRepository.findByDptmNoOrderByEmpRkDesc(departmentEntityRepository.findById(1).get());
        List<EmployeeDto> response = new ArrayList<>();
        result.forEach( e ->{
            response.add(e.allToDto());
        });

        return response;
    }


  /*  @Transactional
    public boolean leaveEmpStatus(RetiredEmployeeDto retiredEmployeeDto)
    {

        Optional<EmployeeEntity> optionalEmployeeEntity = employeeRepository.findByEmpNo(retiredEmployeeDto.getEmpNo());
        System.out.println("retiredEmployeeDto = " + retiredEmployeeDto);
        System.out.println("optionalEmployeeEntity = " + optionalEmployeeEntity);
        if(optionalEmployeeEntity.isPresent())
        {
            EmployeeEntity employeeEntity = optionalEmployeeEntity.get();
            employeeEntity.setEmpSta(!employeeEntity.isEmpSta());

            setRetiredEmployee(retiredEmployeeDto);
            return true;
        }else{
            return false;
        }

    }
    @Transactional
    public void setRetiredEmployee(ApprovalRequestDto<RetiredEmployeeDto> approvalRequestDto)
    {
        RetiredEmployeeDto retiredEmployeeDto = approvalRequestDto.getData();
        Optional<EmployeeEntity> optionalEmployeeEntity = employeeRepository.findByEmpNo(retiredEmployeeDto.getEmpNo());
        if(optionalEmployeeEntity.isPresent())
        {
            RetiredEmployeeEntity retiredEmployeeEntity = retiredEmployeeDto.saveToEntity();
            retiredEmployeeEntity.setEmpNo(optionalEmployeeEntity.get());
            retiredEmployeeEntityRepository.save(retiredEmployeeEntity);

            optionalEmployeeEntity.get().getRetiredEmployeeEntities().add(retiredEmployeeEntity);
            System.out.println("optionalEmployeeEntity.to = " + optionalEmployeeEntity.get());
            System.out.println("retiredEmployeeEntity = " + retiredEmployeeEntity);

        }



    }*/

    // 휴직 사원 조회
    @Transactional
    public List<EmployeeDto> getRestList()
    {
        List<EmployeeDto> result = new ArrayList<>();
        employeeRepository.findAllByEmpStaIsFalse().forEach(e ->{
            result.add(e.allToDto());
        });

        return result;

    }













}
