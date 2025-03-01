package in.coempt.dao;

import in.coempt.util.QueryUtil;
import in.coempt.vo.MenuPage;
import in.coempt.vo.QPSetterDashBoardVo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DashBoardRepository {

    public List<QPSetterDashBoardVo> getSetterDashBoard(String userName,Long userId) {
        QueryUtil<QPSetterDashBoardVo> queryUtil = new QueryUtil<>(QPSetterDashBoardVo.class);
        return queryUtil.list("SELECT ts.syllabus,qp.subject_id,ts.subject_code,ts.subject_name,course_name,year,semester,no_of_sets," +
                "last_date_to_submit as submission_date,\n" +
                "(SELECT count(id) FROM tbl_qp_files where user_id=?) as no_of_sets_uploaded,\n" +
                "(SELECT count(id) FROM tbl_qp_files where user_id=?) as no_of_sets_forwarded\n" +
                "FROM tbl_appointments_bulk qp,tbl_subjects ts,tbl_courses tc where tc.id=ts.course_id\n" +
                "and ts.id=qp.subject_id and qp.user_id=?", userId,userId,userId);
    }

    public List<QPSetterDashBoardVo> getModeratorDashBoard(String userName,Long userId) {
        QueryUtil<QPSetterDashBoardVo> queryUtil = new QueryUtil<>(QPSetterDashBoardVo.class);
        return queryUtil.list("SELECT ts.syllabus,qp.subject_id,ts.subject_code,ts.subject_name,course_name,year,semester,no_of_sets," +
                "last_date_to_submit as submission_date,\n" +
                        "(SELECT count(id) FROM tbl_qp_files where user_id=? and qp_status='PENDING') as no_of_sets_uploaded,\n" +
                        "(SELECT count(id) FROM tbl_qp_files where user_id=? and qp_status='FORWARDED') as no_of_sets_forwarded\n" +
                        "FROM tbl_appointments_bulk qp,tbl_subjects ts,tbl_courses tc where tc.id=ts.course_id\n" +
                        "and ts.id=qp.subject_id and qp.user_id=?", userId,userId,userId);
    }



}
