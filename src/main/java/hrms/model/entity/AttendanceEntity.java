package hrms.model.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;


@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
@Table(name = "attd")
public class AttendanceEntity extends BaseTime{
    //필드설계
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto-increment,
    private int attd_no;       // 근태기록번호(식별)

    @Column()
    private String attd_wrst;         // 출근시간
    @Column()
    private String attd_wrend;           // 퇴근 시간
    @ToString.Exclude
    @JoinColumn(name="emp_no")
    @ManyToOne
    private EmployeeEntity emp_no;              // 사원번호

/*    public AttendanceDto allToDto() {
        return AttendanceDto.builder()
                .arno(this.arno)
                .arWorkStartTime(this.arWorkStartTime)
                .arWorkEndTime(this.arWorkEndTime)
                .employeeId(this.employeeId)
                .build();
    }*/

}