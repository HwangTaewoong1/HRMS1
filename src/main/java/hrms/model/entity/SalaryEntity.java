package hrms.model.entity;

import hrms.model.dto.LeaveRequestDto;
import hrms.model.dto.SalaryDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
@Table(name = "SLRY")
public class SalaryEntity extends BaseTime {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private int slryNo;            // 1. 급여 식별번호 ( PK )

    @Column()
    private LocalDate slryDate;      // 2. 급여 지급 날짜

    @Column()
    private int slryPay;                // 3. 지급 금액

    @Min(1)
    @Max(6)
    @Column()
    private int slryType;               // 4. 지급유형 ( 1:기본급/2:정기상여/3:특별상여/4:성과금/5:명절휴가비/6:퇴직금)

    @ToString.Exclude
    @JoinColumn(name="empNo")
    @ManyToOne
    private EmployeeEntity empNo;        // 5. 사원번호 ( FK )

    @ToString.Exclude
    @JoinColumn(name="aprvNo")
    @ManyToOne
    private ApprovalEntity aprvNo;     // 6.결제번호

    // 1. 전체 출력
    public SalaryDto allToDto(){
        return  SalaryDto.builder()
                .slryNo(this.slryNo)
                .slryDate(this.slryDate)
                .slryPay(this.slryPay)
                .slryType(this.slryType)
                .empNo(this.empNo.getEmpNo())
                .aprvNo(this.aprvNo.getAprvNo())
                .cdate(this.getCdate()).udate(this.getUdate())
                .build();
    }
}
