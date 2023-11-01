package hrms.model.dto;

import hrms.model.entity.AttendanceEntity;
import hrms.model.entity.EmployeeEntity;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class AttendanceDto {
    //필드설계
    private int attdNo;              // 근태기록번호(식별)
    private String attdWrst;         // 출근시간
    private String attdWrend;        // 퇴근 시간
    private EmployeeEntity empNo;    // 사원번호

    public AttendanceEntity toEntity() {
        return AttendanceEntity.builder()
                .attdNo(this.attdNo)
                .attdWrst(this.attdWrst)
                .attdWrend(this.attdWrend)
                .empNo(this.empNo)
                .build();
    }
}