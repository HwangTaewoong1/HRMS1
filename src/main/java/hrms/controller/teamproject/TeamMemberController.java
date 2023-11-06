package hrms.controller.teamproject;

import hrms.model.dto.ApprovalRequestDto;
import hrms.model.dto.ProjectDto;
import hrms.model.dto.TeamMemberDto;
import hrms.service.teamproject.TeamMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teammember")
public class TeamMemberController {

    @Autowired
    private TeamMemberService teamMemberService;

    // 팀프로젝트 팀원 등록
    @PostMapping("/post")
    public boolean postTeamMember(@RequestBody ApprovalRequestDto<TeamMemberDto> approvalRequestDto) {

        return teamMemberService.postTeamMember(approvalRequestDto);
    }


    // 팀프로젝트 팀원 개별조회
    @GetMapping("/getOne")
    public TeamMemberDto getTeamMember(int tmNo){
        return teamMemberService.getTeamMember(tmNo);
    }

}
