package hrms.model.entity;


import hrms.model.dto.ProjectDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor@NoArgsConstructor
@Getter@Setter@Builder@ToString
@DynamicInsert
@Table(name = "PJT_MNG")
public class ProjectEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pjtNo; //  프로젝트번호
    @ToString.Exclude
    @JoinColumn(name="empNo")
    @ManyToOne
    private EmployeeEntity empNo;    // 프로젝트 관리자 사원번호(fk)
    @Column
    private String pjtName;    // 프로젝트명
    @Column
    private String pjtSt;      // 프로젝트 시작날짜
    @Column
    private String pjtEND;     // 프로젝트 기한
    @Column
    @ColumnDefault("1")         // 프로젝트 상태 디폴트값(1 = 진행중)
    private int pjtSta;        // 프로젝트 상태
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name="aprvNo")
    private ApprovalEntity aprvNo;            // 결재번호(fk)

    @Builder.Default
    @OneToMany(mappedBy="pjt_no")
    private List<TeamMemberEntity> teamMemberEntities = new ArrayList<>();

    // 1. 전체 출력할때 메소드
    public ProjectDto allToDto(){
        return ProjectDto.builder()
                .pjt_no(this.pjtNo)
                .emp_no(this.empNo.getEmp_no())
                .pjt_name(this.pjtName)
                .pjt_st(this.pjtSt)
                .pjt_END(this.pjtEND)
                .pjt_sta(this.pjtSta)
                .aprv_no((this.aprvNo.getAprv_no()))
                .build();
    }

}
