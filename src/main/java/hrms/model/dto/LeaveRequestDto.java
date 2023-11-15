package hrms.model.dto;

import hrms.model.entity.LeaveRequestEntity;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class LeaveRequestDto {
    private int lrqNo;
    private int lrqType;
    private LocalDate lrqSt;
    private LocalDate lrqEnd;
    private int lrqSrtype;
    private String empNo;
    private int aprvNo;
    // +
    private LocalDateTime cdate;
    private LocalDateTime udate;
    // +
    private String empName;
    // 남은 연차 수
    private int leaveCnt;
    //DTO -> entity
    // 1. entity 저장할때
    public LeaveRequestEntity saveToEntity( ){
        return LeaveRequestEntity.builder()
                .lrqType(this.lrqType)
                .lrqSt(this.lrqSt)
                .lrqEnd(this.lrqEnd)
                .lrqSrtype(this.lrqSrtype)
                .build();

    }
}
